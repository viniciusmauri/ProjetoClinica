import Usuario from '../models/Usuario';
import File from '../models/File';

class FuncionarioController {
  async index(req, res) {
    const funcionarios = await Usuario.findAll({
      where: { funcionario: true },
      attributes: ['id', 'nome', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['nome', 'path', 'url'],
        },
      ],
    });
    return res.json(funcionarios);
  }
}
export default new FuncionarioController();
