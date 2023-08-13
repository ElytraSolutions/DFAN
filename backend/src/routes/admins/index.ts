import { Router } from 'express';
import addAdmin from './add';
import getUsers from './getUsers';
import inviteUser from './inviteUser';
import register from './register';
import verifyUser from './verifyUser';
import getInvitations from './getInvitations';
import analytics from './analytics';
import getUser from './getUser';
import uninviteUser from './deleteInvitation';
import rejectUser from './rejectUser';
import verifyRejectedUser from './verifyRejected';
import { checkAdmin } from '../../middleware/checkAdmin';
import checkCentralAdmin from '../../middleware/checkCentralAdmin';

const router = Router();

router.get('/add', checkCentralAdmin, addAdmin);
router.get('/analytics', checkAdmin, analytics);
router.get('/getInvitations', checkAdmin, getInvitations);
router.get('/getUser/:id', checkAdmin, getUser);
router.get('/getUsers', checkAdmin, getUsers);
router.post('/inviteUser', checkAdmin, inviteUser);
router.post('/register', checkAdmin, register);
router.delete('/inviteUser/:email', checkAdmin, uninviteUser);
router.post('/rejectUser', checkAdmin, rejectUser);
router.post('/verifyRejectedUser', checkAdmin, verifyRejectedUser);
router.post('/verifyUser', checkAdmin, verifyUser);

export default router;
