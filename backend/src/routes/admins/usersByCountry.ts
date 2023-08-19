import { Request, Response } from 'express';
import UserProfile from '../../models/UserProfile';
import sequelize from '../../models/config';

export default async function usersByCountry(req: Request, res: Response) {
    const users = await UserProfile.findAll({
        attributes: [
            ['currentAddress', 'country'],
            [sequelize.fn('COUNT', sequelize.col('currentAddress')), 'count'],
        ],
        group: 'currentAddress',
    });
    res.json(users);
}
