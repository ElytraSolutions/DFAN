import { Request, Response } from 'express';
import Users from '../../models/Users';
import UserProfile from '../../models/UserProfile';

export default async function loggedInUserData(req: Request, res: Response) {
    if (!req.session.user) {
        return res.status(401).json({ message: 'User should be logged in!' });
    }
    const data = await Users.findOne({
        where: {
            email: req.session.user.email
        },
        include: [
            {
                model: UserProfile,
                as: 'userProfile',
            },
        ],
    });
    return res.json({ session: req.session, data });
}
