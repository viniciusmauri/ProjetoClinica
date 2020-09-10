import Usuario from '../models/Usuario';
import File from '../models/File';

class FornecedorController {
  async index(req, res) {
    const fornecedores = await Usuario.findAll({
      where: { fornecedor: true },
      attributes: ['id', 'nome', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['nome', 'path', 'url'],
        },
      ],
    });
    return res.json(fornecedores);
  }
}
export default new FornecedorController();
