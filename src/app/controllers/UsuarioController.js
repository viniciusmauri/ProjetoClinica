import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const verificaUsuarioExistente = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (verificaUsuarioExistente) {
      return res.status(400).json({ error: 'Usuário já cadastrado' });
    }
    const { id, nome, email, fornecedor } = await Usuario.create(req.body);

    return res.json({
      id,
      nome,
      email,
      fornecedor,
    });
  }
}

export default new UsuarioController();
