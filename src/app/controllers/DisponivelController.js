import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Agendamento from '../models/Agendamento';

class DisponivelController {
  async index(req, res) {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Data inválida' });
    }

    const procurarData = Number(date);

    const agendamentos = await Agendamento.findAll({
      where: {
        funcionario_id: req.params.funcionarioId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(procurarData), endOfDay(procurarData)],
        },
      },
    });

    const agenda = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '23:00',
      '0:00',
    ];

    const disponivel = agenda.map(time => {
      const [hour, minute] = time.split(':');
      const valor = setSeconds(
        setMinutes(setHours(procurarData, hour), minute),
        0
      );

      return {
        time,
        value: format(valor, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        disponivel:
          isAfter(valor, new Date()) &&
          !agendamentos.find(a => format(a.date, 'HH:mm') === time),
      };
    });
    return res.json();
  }
}

export default new DisponivelController();
