import { RequestHandler, Router } from 'express';
import getUsers from './getUsers';
import inviteUser from './inviteUser';
import register from './register';
import verifyUser from './verifyUser';
import getInvitations from './getInvitations';

const checkAdmin: RequestHandler = (req, res, next) => {
    const currentUser = req.session.user;
    if (!currentUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isAdmin =
        ['Central Admin', 'Regional Admin'].indexOf(currentUser.role) !== -1;
    if (!isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
};

const router = Router();

router.get('/getInvitations', checkAdmin, getInvitations);
router.get('/getUsers', checkAdmin, getUsers);
router.post('/inviteUser', checkAdmin, inviteUser);
router.post('/register', checkAdmin, register);
router.post('/verifyUser', checkAdmin, verifyUser);

export default router;
