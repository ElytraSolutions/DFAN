import { Request, Response } from 'express';
import Users from '../../models/Users';
import UserProfile from '../../models/UserProfile';
import VerificationList from '../../models/VerificationList';

export default async function loggedInUserData(req: Request, res: Response) {
    const userData = await Users.findOne({
        where: {
            email: req.session.user!.email,
        },
        include: [
            {
                model: UserProfile,
                include: [VerificationList],
            },
        ],
    });
    if (userData) {
        const { password: _, ...rest } = userData.dataValues;
        return res.json({ session: req.session, data: rest });
    }
    return res.status(404).json({ message: 'Could not find user' });
}
