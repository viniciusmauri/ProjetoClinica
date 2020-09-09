import * as Yup from 'yup';
import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      senhaAntiga: Yup.string(),
      senha: Yup.string()
        .min(6)
        .when('senhaAntiga', (senhaAntiga, field) =>
          senhaAntiga ? field.required() : field
        ),
      confirmaSenha: Yup.string().when('senha', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('senha')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { email, senhaAntiga } = req.body;

    const usuario = await Usuario.findByPk(req.usuarioId);

    if (email !== usuario.email) {
      const verificaUsuarioExistente = await Usuario.findOne({
        where: { email },
      });

      if (verificaUsuarioExistente) {
        return res.status(400).json({ error: 'Usuário já cadastrado' });
      }
    }

    if (senhaAntiga && !(await usuario.checkPassword(senhaAntiga))) {
      return res.status(401).json({ error: 'Senha não confere' });
    }

    const { id, nome, provider } = await usuario.update(req.body);

    return res.json({ id, nome, email, provider });
  }
}

export default new UsuarioController();
