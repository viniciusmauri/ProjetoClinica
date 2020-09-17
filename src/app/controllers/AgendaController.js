import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Agendamento from '../models/Agendamento';
import Usuario from '../models/Usuario';

class AgendaController {
  async index(req, res) {
    const verificaFuncionario = await Usuario.findOne({
      where: { id: req.usuarioId, funcionario: true },
    });

    if (!verificaFuncionario) {
      return res.status(401).json({ error: 'O usuário não é um funcionário' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const agendamentos = await Agendamento.findAll({
      where: {
        funcionario_id: req.usuarioId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nome'],
        },
      ],
      order: ['date'],
    });
    return res.json(agendamentos);
  }
}

export default new AgendaController();
