import { Request, Response, Router } from 'express';
import allowRegistration from './allowRegistration';

const router = Router();
// router.use((req, res, next) => {
//     if (!req.session.user) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
//     if (req.session.user.role !== 'admin') {
//         return res.status(403).json({ message: 'Forbidden' });
//     }
//     return next();
// });
router.post('/allowRegistration', allowRegistration);

export default router;
