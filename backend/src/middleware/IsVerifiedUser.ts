import { NextFunction, Request, Response } from 'express';
import UserProfile from '../models/UserProfile';
import Users from '../models/Users';
import VerificationList from '../models/VerificationList';

async function IsVerifiedUser(req: Request, res: Response, next: NextFunction) {
    const email = req.session?.user?.email;
    if (!email) {
        return res.status(403).json({ message: 'You are not logged in' });
    }
    const user = await Users.findOne({
        where: { email },
        include: [
            {
                model: UserProfile,
                include: [VerificationList],
            },
        ],
    });
    if (!user) {
        return res.status(404).json({ message: 'Could not find user' });
    }
    if (user?.UserProfile?.VerificationList?.status === 'pending') {
        return res.status(400).json({
            message:
                'Your profile is currently being reviewed for verification',
        });
    }
    if (user?.UserProfile?.VerificationList?.status === 'rejected') {
        return res
            .status(400)
            .json({ message: 'Your profile has been rejected' });
    }
    return next();
}

export default IsVerifiedUser;
