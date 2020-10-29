import { Router } from 'express';
import ingredienteController from '../controllers/IngredienteController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, ingredienteController.index); // Lista todos os ingredientes
router.get('/:id', loginRequired, ingredienteController.show); // Mostra os dados do ingrediente
router.post('/', loginRequired, ingredienteController.create); // Cadastra um novo ingrediente
router.put('/:id', loginRequired, ingredienteController.update); // Atualiza o ingrediente
router.delete('/:id', loginRequired, ingredienteController.delete); // Apaga o ingrediente

export default router;
