import { RequestHandler } from 'express';

export const checkAdmin: RequestHandler = (req, res, next) => {
    const currentUser = req.session.user;
    if (!currentUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isAdmin = ['Central Admin', 'Regional Admin'].indexOf(currentUser.role) !== -1;
    if (!isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
};
