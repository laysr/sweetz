import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import ConfeitariasController from './controllers/ConfeitariasController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/confeitaria', ConfeitariasController.index);
routes.get('/confeitaria/:id', ConfeitariasController.show);
routes.post('/confeitaria', upload.single('logo'), ConfeitariasController.create);
routes.put('/confeitaria/:id', ConfeitariasController.update);
routes.delete('/confeitaria', ConfeitariasController.delete);

export default routes;