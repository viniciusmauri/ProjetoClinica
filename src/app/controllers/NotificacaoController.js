import Notificacao from '../schemas/Notificacao';
import Usuario from '../models/Usuario';

class NotificacaoController {
  async index(req, res) {
    const checarFuncionario = await Usuario.findOne({
      where: { id: req.usuarioId, funcionario: true },
    });

    if (!checarFuncionario) {
      return res
        .status(401)
        .json({ error: 'Somente funcionários podem acessar as notificações' });
    }

    const notificacoes = await Notificacao.find({
      usuario: req.usuarioId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notificacoes);
  }

  async update(req, res) {
    const notificacao = await Notificacao.findByIdAndUpdate(
      req.params.id,
      { lidas: true },
      { new: true }
    );

    return res.json(notificacao);
  }
}

export default new NotificacaoController();
