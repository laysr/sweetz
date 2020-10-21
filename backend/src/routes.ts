import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import ConfeitariasController from './controllers/ConfeitariasController';
import ClientesController from './controllers/ClientesController';

import authConfeitaria from './middlewares/authConfeitaria';
import authCliente from './middlewares/authCliente';

const routes = Router();
const upload = multer(uploadConfig);

// Rotas Confeitarias
routes.get('/confeitarias', ConfeitariasController.index);
routes.get('/confeitaria/:id', ConfeitariasController.show);
routes.post('/confeitaria', upload.single('logo'), ConfeitariasController.create);
routes.put('/confeitaria/:id', authConfeitaria, ConfeitariasController.update);
routes.delete('/confeitaria',  authConfeitaria, ConfeitariasController.delete);
routes.post('/confeitaria/login', ConfeitariasController.login);

// Rotas Clientes
routes.get('/clientes', ClientesController.index);
routes.get('/cliente/:id', ClientesController.show);
routes.post('/cliente', ClientesController.create);
routes.put('/cliente/:id', authCliente, ClientesController.update);
routes.delete('/cliente',  authCliente, ClientesController.delete);
routes.post('/cliente/login', ClientesController.login);

export default routes;