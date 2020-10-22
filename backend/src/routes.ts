import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import ConfeitariasController from './controllers/ConfeitariasController';
import ClientesController from './controllers/ClientesController';
import IngredientesController from './controllers/IngredientesController';

import authConfeitaria from './middlewares/authConfeitaria';
import authCliente from './middlewares/authCliente';

const routes = Router();
const upload = multer(uploadConfig);

// Rotas Confeitarias
routes.get('/confeitarias', authCliente, ConfeitariasController.index);
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

// Rotas Ingredientes
routes.get('/ingredientes', authConfeitaria, IngredientesController.index);
routes.get('/ingrediente/:id', authConfeitaria,IngredientesController.show);
routes.post('/ingrediente', authConfeitaria, IngredientesController.create);
routes.put('/ingrediente/:id', authConfeitaria, IngredientesController.update);
routes.delete('/ingrediente',  authConfeitaria, IngredientesController.delete);

export default routes;