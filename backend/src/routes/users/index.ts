import { RequestHandler, Router } from 'express';
import upload from '../../config/multer';
import createProfile from './createProfile';
import editProfile from './editProfile';
import me from './me';
import register from './register';
import status from './status';
import updatePicture from './updatePicture';
import verifyCode from './verifyCode';
import IsVerifiedUser from '../../middleware/IsVerifiedUser';

const userIsLoggedIn: RequestHandler = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const router = Router();
router.post('/createProfile', userIsLoggedIn, createProfile);
router.post('/editProfile', userIsLoggedIn, editProfile);
router.get('/me', userIsLoggedIn, me);
router.post('/register', register);
router.get('/status', status);
router.post(
    '/updatePicture',
    userIsLoggedIn,
    upload.single('picture'),
    updatePicture,
);
router.post('/verifyCode', verifyCode);

export default router;
