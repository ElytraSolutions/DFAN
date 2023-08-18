import { Request, Response } from 'express';
import UserProfile from '../../models/UserProfile';
import sequelize from '../../models/config';

export default async function usersByRegion(req: Request, res: Response) {
    const users = await UserProfile.findAll({
        attributes: [
            ['membershipFrom', 'region'],
            [sequelize.fn('COUNT', sequelize.col('membershipFrom')), 'count'],
        ],
        group: 'membershipFrom',
    });
    res.json(users);
}
