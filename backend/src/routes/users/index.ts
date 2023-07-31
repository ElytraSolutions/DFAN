import { Router } from 'express';
import me from './me';
import getStatus from './status';
import verifyCode from './verifyCode';
import newProfile from './newProfile';
import editProfile from './editProfile';

const router = Router();
router.get('/me', me);
router.get('/status', getStatus);
router.post('/verifyCode', verifyCode);
router.post('/newProfile', newProfile);
router.post('/editProfile', editProfile);

export default router;
