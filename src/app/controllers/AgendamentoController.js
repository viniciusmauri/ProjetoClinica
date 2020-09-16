import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Agendamento from '../models/Agendamentos';
import Usuario from '../models/Usuario';
import File from '../models/File';
import Nofiticacao from '../schemas/Notificacao';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AgendamentoController {
  async index(req, res) {
    const agendamentos = await Agendamento.findAll({
      where: { usuario_id: req.usuarioId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: Usuario,
          as: 'funcionario',
          attributes: ['id', 'nome'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(agendamentos);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      funcionario_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inválidos' });
    }

    const { funcionario_id, date } = req.body;

    const checarFuncionario = await Usuario.findOne({
      where: { id: funcionario_id, funcionario: true },
    });

    if (funcionario_id === req.usuarioId) {
      return res
        .status(401)
        .json({ error: 'Você não pode fazer um agendamento para você mesmo' });
    }

    if (!checarFuncionario) {
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
    const usuario = await Usuario.findByPk(req.usuarioId);
    const dataFormatada = format(
      horaInicial,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Nofiticacao.create({
      content: `Novo agendamento de ${usuario.nome} para o ${dataFormatada}`,
      usuario: funcionario_id,
    });

    return res.json(agendamento);
  }

  async delete(req, res) {
    const agendamento = await Agendamento.findByPk(req.params.id, {
      include: [
        {
          model: Usuario,
          as: 'funcionario',
          attributes: ['nome', 'email'],
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nome'],
        },
      ],
    });

    if (agendamento.usuario_id !== req.usuarioId) {
      return res.status(401).json({
        error: 'Você não tem permissão para cancelar este agendamento',
      });
    }

    const dateWithSub = subHours(agendamento.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error:
          'Você só consegue cancelar um agendamento com 2 horas de antecedência',
      });
    }

    agendamento.canceled_at = new Date();

    await agendamento.save();

    await Queue.add(CancellationMail.key, {
      agendamento,
    });

    return res.json(agendamento);
  }
}

export default new AgendamentoController();
