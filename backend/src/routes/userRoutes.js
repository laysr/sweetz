import { Router } from 'express';
import multer from 'multer';

import userController from '../controllers/UserController';

import multerConfig from '../config/multer';

import loginRequired from '../middlewares/loginRequired';

const upload = multer(multerConfig);

const router = new Router();

router.get('/', userController.index); // Lista todos as users
router.get('/:id', loginRequired, userController.show); // Mostra os dados do user logado
router.post('/', upload.single('logo'), userController.create); // Cadastra um novo user
router.put('/', loginRequired, upload.single('logo'), userController.update); // Atualiza o user logado
router.delete('/', loginRequired, userController.delete); // Apaga o user logado

export default router;
