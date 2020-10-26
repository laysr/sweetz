import { Router } from 'express';
import multer from 'multer';

import confeitariaController from '../controllers/ConfeitariaController';

import multerConfig from '../config/multer';

import confeitariaLoginRequired from '../middlewares/confeitariaLoginRequired';
import clienteLoginRequired from '../middlewares/clienteLoginRequired';
import loginRequired from '../middlewares/loginRequired';

const upload = multer(multerConfig);

const router = new Router();

router.get('/', clienteLoginRequired, confeitariaController.index); // Lista todas as confeitarias
router.get('/:id', loginRequired, confeitariaController.show); // Mostra os dados da confeitaria logada
router.post('/', upload.single('logo'), confeitariaController.create); // Cadastra uma nova confeitaria
router.put('/', confeitariaLoginRequired, upload.single('logo'), confeitariaController.update); // Atualiza a confeitaria logada
router.delete('/', confeitariaLoginRequired, confeitariaController.delete); // Apaga a confeitaria logada

export default router;
