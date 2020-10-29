import { Router } from 'express';
import multer from 'multer';

import produtoController from '../controllers/ProdutoController';

import multerConfig from '../config/multer';

import loginRequired from '../middlewares/loginRequired';

const upload = multer(multerConfig);

const router = new Router();

router.get('/', loginRequired, produtoController.index); // Lista todos os produtos da user logada
router.get('/:id', loginRequired, produtoController.show); // Mostra os dados do produto
router.post('/', loginRequired, upload.single('image'), produtoController.create); // Cadastra um novo produto
router.put('/', loginRequired, produtoController.custo); // Calcula o custo de um produto
router.put('/:id', loginRequired, upload.single('image'), produtoController.update); // Atualiza um produto
router.delete('/:id', loginRequired, produtoController.delete); // Apaga um produto

export default router;
