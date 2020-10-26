import { Router } from 'express';
import ingredienteProdutoController from '../controllers/IngredienteProdutoController';

import confeitariaLoginRequired from '../middlewares/confeitariaLoginRequired';

const router = new Router();

router.get('/', confeitariaLoginRequired, ingredienteProdutoController.index); // Lista todos os ingredientes em um Produto
router.get('/:id', confeitariaLoginRequired, ingredienteProdutoController.show); // Mostra os dados do ingrediente
router.post('/', confeitariaLoginRequired, ingredienteProdutoController.create); // Insere um novo ingrediente em um Produto
router.put('/:id', confeitariaLoginRequired, ingredienteProdutoController.update); // Atualiza o ingrediente em um Produto
router.delete('/:id', confeitariaLoginRequired, ingredienteProdutoController.delete); // Apaga o ingrediente de um Produto

export default router;
