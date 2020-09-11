import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Agendamento from '../models/Agendamentos';
import Usuario from '../models/Usuario';

class AgendamentoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      funcionario_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inválidos' });
    }

    const { funcionario_id, date } = req.body;

    const isFuncionario = await Usuario.findOne({
      where: { id: funcionario_id, funcionario: true },
    });

    if (funcionario_id === req.usuarioId) {
      return res
        .status(401)
        .json({ error: 'Você não pode fazer um agendamento para você mesmo' });
    }

    if (!isFuncionario) {
      return res.status(401).json({
        error: 'Você só consegue criar agendamentos para funcionarios ',
      });
    }

    const horaInicial = startOfHour(parseISO(date));

    if (isBefore(horaInicial, new Date())) {
      return res.status(400).json({
        error: 'Data ou horário inválidos, data ou horário já passou',
      });
    }

    const checarDisponibilidade = await Agendamento.findOne({
      where: {
        funcionario_id,
        canceled_at: null,
        date: horaInicial,
      },
    });

    if (checarDisponibilidade) {
      return res.status(400).json({ error: 'Data ou horário indisponível' });
    }

    const agendamento = await Agendamento.create({
      usuario_id: req.usuarioId,
      funcionario_id,
      date: horaInicial,
    });
    return res.json(agendamento);
  }
}

export default new AgendamentoController();
