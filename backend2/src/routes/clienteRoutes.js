import { Router } from 'express';
import clienteController from '../controllers/ClienteController';

import clienteLoginRequired from '../middlewares/clienteLoginRequired';

const router = new Router();

router.get('/', clienteController.index); // Lista todos os clientes
router.get('/', clienteLoginRequired, clienteController.show); // Mostra os dados do cliente logado
router.post('/', clienteController.create); // Cadastra um novo cliente
router.put('/', clienteLoginRequired, clienteController.update); // Atualiza o cliente logado
router.delete('/', clienteLoginRequired, clienteController.delete); // Apaga o cliente logado

export default router;
