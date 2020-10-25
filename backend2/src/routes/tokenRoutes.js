import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = new Router();

router.post('/cliente', tokenController.clienteStore);
router.post('/confeitaria', tokenController.confeitariaStore);

export default router;
