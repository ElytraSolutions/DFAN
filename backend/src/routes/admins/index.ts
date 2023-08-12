import { RequestHandler, Router } from 'express';
import getUsers from './getUsers';
import inviteUser from './inviteUser';
import register from './register';
import verifyUser from './verifyUser';
import getInvitations from './getInvitations';
import analytics from './analytics';
import getUser from './getUser';
import uninviteUser from './deleteInvitation';
import rejectUser from './rejectUser';

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

router.get('/analytics', checkAdmin, analytics);
router.get('/getInvitations', checkAdmin, getInvitations);
router.get('/getUser/:id', checkAdmin, getUser);
router.get('/getUsers', checkAdmin, getUsers);
router.post('/inviteUser', checkAdmin, inviteUser);
router.post('/register', checkAdmin, register);
router.delete('/inviteUser/:email', checkAdmin, uninviteUser);
router.post('/rejectUser', checkAdmin, rejectUser);
router.post('/verifyUser', checkAdmin, verifyUser);

export default router;
