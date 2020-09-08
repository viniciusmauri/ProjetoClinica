import { Router } from 'express';
import Usuario from '../app/models/Usuario';

import UsuarioController from '../app/controllers/UsuarioController';

const routes = new Router();

routes.post('/users', UsuarioController.store);

/* routes.get('/', async (req, res) => {
  const user = await User.create({
    nome: 'Mauri Vinicius Santos Moura',
    email: 'viniciusmauri@gmail.com',
    senha_hash: '31975078679',
  });
  return res.json(user);
}); */

export default routes;
