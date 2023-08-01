import { Router } from 'express';
import createProfile from './createProfile';
import editProfile from './editProfile';
import login from './login';
import logout from './logout';
import me from './me';
import register from './register';
import status from './status';
import verifyCode from './verifyCode';

const router = Router();
router.post('/createProfile', createProfile);
router.post('/editProfile', editProfile);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', me);
router.post('/register', register);
router.get('/status', status);
router.post('/verifyCode', verifyCode);

export default router;
