import { Router } from 'express';
import multer from 'multer';

import produtoController from '../controllers/ProdutoController';

import multerConfig from '../config/multer';

import confeitariaLoginRequired from '../middlewares/confeitariaLoginRequired';

const upload = multer(multerConfig);

const router = new Router();

router.get('/', confeitariaLoginRequired, produtoController.index); // Lista todas as confeitarias
router.get('/:id', confeitariaLoginRequired, produtoController.show); // Mostra os dados da confeitaria logada
router.post('/', confeitariaLoginRequired, upload.single('image'), produtoController.create); // Cadastra uma nova confeitaria
router.put('/:id', confeitariaLoginRequired, upload.single('image'), produtoController.update); // Atualiza a confeitaria logada
router.delete('/:id', confeitariaLoginRequired, produtoController.delete); // Apaga a confeitaria logada

export default router;
