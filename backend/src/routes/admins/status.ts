import { Request, Response } from 'express';
import CoreAdmins from '../../models/CoreAdmins';
import UserProfile from '../../models/UserProfile';
import RegionalAdmins from '../../models/RegionalAdmins';

export default async function status (req: Request, res: Response) {
    if (!req.session.adminUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    let data;
    if(req.session.adminUser.type === 'central') {
        data = await CoreAdmins.findOne({
            where: {
                email: req.session.adminUser.email,
            },
            include: UserProfile
        });
    } else if (req.session.adminUser.type === 'regional') {
        data = await RegionalAdmins.findOne({
            where: {
                email: req.session.adminUser.email,
            },
            include: UserProfile
        });
    return res.json({ session: req.session, data })
};
