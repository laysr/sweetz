import { Router } from 'express';
import ingredienteController from '../controllers/IngredienteController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/padrao', ingredienteController.indexPadrao); // Lista todos os ingredientes Padrão
router.get('/', loginRequired, ingredienteController.indexUser); // Lista todos os ingredientes do usuário logado
router.get('/:id', loginRequired, ingredienteController.show); // Mostra os dados do ingrediente
router.post('/', loginRequired, ingredienteController.create); // Cadastra um novo ingrediente
router.put('/:id', loginRequired, ingredienteController.update); // Atualiza o ingrediente
router.delete('/:id', loginRequired, ingredienteController.delete); // Apaga o ingrediente

export default router;
