import { RequestHandler } from 'express';

const checkAdmin: RequestHandler = (req, res, next) => {
    const currentUser = req.session.user;
    if (!currentUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isAdmin = currentUser.role === 'Central Admin';
    if (!isAdmin) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    return next();
};

export default checkAdmin;
