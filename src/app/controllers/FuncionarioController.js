import Usuario from '../models/Usuario';
import Arquivo from '../models/Arquivo';

class FuncionarioController {
  async index(req, res) {
    const funcionarios = await Usuario.findAll({
      where: { funcionario: true },
      attributes: ['id', 'nome', 'email', 'avatar_id'],
      include: [
        {
          model: Arquivo,
          as: 'avatar',
          attributes: ['nome', 'path', 'url'],
        },
      ],
    });
    return res.json(funcionarios);
  }
}
export default new FuncionarioController();
