import Arquivo from '../models/Arquivo';

class ArquivoController {
  async store(req, res) {
    const { originalname: nome, filename: path } = req.arquivo;

    const arquivo = await Arquivo.create({
      nome,
      path,
    });

    return res.json(arquivo);
  }
}

export default new ArquivoController();
