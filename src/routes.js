import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import auth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UsuarioController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.put('/users', UsuarioController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
