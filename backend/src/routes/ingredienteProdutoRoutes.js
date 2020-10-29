import { Router } from 'express';
import ingredienteProdutoController from '../controllers/IngredienteProdutoController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, ingredienteProdutoController.index); // Lista todos os ingredientes em um Produto
router.get('/:id', loginRequired, ingredienteProdutoController.show); // Mostra os dados do ingrediente
router.post('/', loginRequired, ingredienteProdutoController.create); // Insere um novo ingrediente em um Produto
router.put('/:id', loginRequired, ingredienteProdutoController.update); // Atualiza o ingrediente em um Produto
router.delete('/:id', loginRequired, ingredienteProdutoController.delete); // Apaga o ingrediente de um Produto

export default router;
