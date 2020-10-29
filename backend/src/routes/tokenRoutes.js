import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = new Router();

router.post('/user', tokenController.userStore);

export default router;
