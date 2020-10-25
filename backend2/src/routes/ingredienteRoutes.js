import { Router } from 'express';
import ingredienteController from '../controllers/IngredienteController';

import confeitariaLoginRequired from '../middlewares/confeitariaLoginRequired';

const router = new Router();

router.get('/', confeitariaLoginRequired, ingredienteController.index); // Lista todos os ingredientes
router.get('/:id', confeitariaLoginRequired, ingredienteController.show); // Mostra os dados do ingrediente
router.post('/', confeitariaLoginRequired, ingredienteController.create); // Cadastra um novo ingrediente
router.put('/:id', confeitariaLoginRequired, ingredienteController.update); // Atualiza o ingrediente
router.delete('/:id', confeitariaLoginRequired, ingredienteController.delete); // Apaga o ingrediente

export default router;
