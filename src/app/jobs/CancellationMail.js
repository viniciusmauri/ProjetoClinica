import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelletionMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { agendamento } = data;

    await Mail.sendMail({
      to: `${agendamento.funcionario.nome} <${agendamento.funcionario.email}>`,
      subject: 'Agendamento cancelado!',
      template: 'cancellation',
      context: {
        funcionario: agendamento.funcionario.nome,
        usuario: agendamento.usuario.nome,
        date: format(
          parseISO(agendamento.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelletionMail();
