import { RequestHandler, Router } from 'express';
import getUsers from './getUsers';
import inviteUser from './inviteUser';
import login from './login';
import register from './register';
import verifyUserProfile from './verifyUserProfile';

const checkAdmin: RequestHandler = (req, res, next) => {
    if (!req.session.adminUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
};

const router = Router();

router.get('/getUsers', checkAdmin, getUsers);
router.post('/inviteUser', checkAdmin, inviteUser);
router.post('/login', login);
router.post('/register', register);
router.post('/verifyUserProfile', checkAdmin, verifyUserProfile);

export default router;
