import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import FuncionarioController from './app/controllers/FuncionarioController';
import AgendamentoController from './app/controllers/AgendamentoController';

import auth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/usuarios', UsuarioController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.put('/usuarios', UsuarioController.update);

routes.get('/Funcionarioes', FuncionarioController.index);

routes.post('/agendamentos', AgendamentoController.store);
routes.get('/agendamentos', AgendamentoController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
