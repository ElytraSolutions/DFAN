import { Request, Response } from 'express';
import Users from '../../models/Users';
import UserProfile from '../../models/UserProfile';
import CoreAdmins from '../../models/CoreAdmins';
import RegionalAdmins from '../../models/RegionalAdmins';

export default async function loggedInUserData(req: Request, res: Response) {
    if (!req.session.user) {
        return res.status(401).json({ message: 'User should be logged in!' });
    }
    const userData = await Users.findOne({
        where: {
            email: req.session.user.email,
        },
        include: [
            {
                model: UserProfile,
            },
        ],
    });
    if (userData) {
        const { password: _, ...rest } = userData.dataValues;
        return res.json({ session: req.session, data: rest });
    }

    const adminData = await CoreAdmins.findOne({
        where: {
            email: req.session.user.email,
        },
        include: [
            {
                model: UserProfile,
            },
        ],
    });
    if (adminData) {
        const { password: _, ...rest } = adminData.dataValues;
        return res.json({ session: req.session, data: rest });
    }

    const regionalUser = await RegionalAdmins.findOne({
        where: {
            email: req.session.user.email,
        },
        include: [
            {
                model: UserProfile,
            },
        ],
    });
    if (regionalUser) {
        const { password: _, ...rest } = regionalUser.dataValues;
        return res.json({ session: req.session, data: rest });
    }

    return res.status(401).json({ message: 'User should be logged in!' });
}
