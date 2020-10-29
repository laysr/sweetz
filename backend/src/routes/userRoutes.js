import { Router } from 'express';
import multer from 'multer';

import userController from '../controllers/UserController';

import multerConfig from '../config/multer';

import loginRequired from '../middlewares/loginRequired';

const upload = multer(multerConfig);

const router = new Router();

router.get('/', clienteLoginRequired, userController.index); // Lista todas as users
router.get('/:id', loginRequired, userController.show); // Mostra os dados da user logada
router.post('/', upload.single('logo'), userController.create); // Cadastra uma nova user
router.put('/', loginRequired, upload.single('logo'), userController.update); // Atualiza a user logada
router.delete('/', loginRequired, userController.delete); // Apaga a user logada

export default router;
