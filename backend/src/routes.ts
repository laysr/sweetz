import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import ConfeitariasController from './controllers/ConfeitariasController';

import authConfeitaria from './middlewares/authConfeitaria';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/confeitaria', ConfeitariasController.index);
routes.get('/confeitaria/:id', ConfeitariasController.show);
routes.post('/confeitaria', upload.single('logo'), ConfeitariasController.create);
routes.put('/confeitaria/:id', authConfeitaria, ConfeitariasController.update);
routes.delete('/confeitaria',  authConfeitaria, ConfeitariasController.delete);
routes.post('/confeitaria-login', ConfeitariasController.login);

export default routes;