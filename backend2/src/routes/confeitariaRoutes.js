import { Router } from 'express';
import confeitariaController from '../controllers/ConfeitariaController';

import confeitariaLoginRequired from '../middlewares/confeitariaLoginRequired';
import clienteLoginRequired from '../middlewares/clienteLoginRequired';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', clienteLoginRequired, confeitariaController.index); // Lista todas as confeitarias
router.get('/:id', loginRequired, confeitariaController.show); // Mostra os dados da confeitaria logada
router.post('/', confeitariaController.create); // Cadastra uma nova confeitaria
router.put('/', confeitariaLoginRequired, confeitariaController.update); // Atualiza a confeitaria logada
router.delete('/', confeitariaLoginRequired, confeitariaController.delete); // Apaga a confeitaria logada

export default router;
