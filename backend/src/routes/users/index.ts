import { Router } from 'express';
import me from './me';
import getStatus from './status';
import verifyCode from './verifyCode';
import editProfile from './editProfile';

const router = Router();
router.get('/me', me);
router.get('/status', getStatus);
router.post('/verifyCode', verifyCode);
router.post('/editProfile', editProfile);

export default router;
