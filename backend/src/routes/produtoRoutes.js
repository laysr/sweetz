import { Router } from 'express';
import multer from 'multer';

import produtoController from '../controllers/ProdutoController';

import multerConfig from '../config/multer';

import confeitariaLoginRequired from '../middlewares/confeitariaLoginRequired';

const upload = multer(multerConfig);

const router = new Router();

router.get('/', confeitariaLoginRequired, produtoController.index); // Lista todos os produtos da confeitaria logada
router.get('/:id', confeitariaLoginRequired, produtoController.show); // Mostra os dados do produto
router.post('/', confeitariaLoginRequired, upload.single('image'), produtoController.create); // Cadastra um novo produto
router.put('/', confeitariaLoginRequired, produtoController.custo); // Calcula o custo de um produto
router.put('/:id', confeitariaLoginRequired, upload.single('image'), produtoController.update); // Atualiza um produto
router.delete('/:id', confeitariaLoginRequired, produtoController.delete); // Apaga um produto

export default router;
