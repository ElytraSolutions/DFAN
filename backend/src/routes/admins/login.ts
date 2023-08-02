import { Request, Response } from 'express';
import CoreAdmins from '../../models/CoreAdmins';
import RegionalAdmins from '../../models/RegionalAdmins';

export default async function login(req: Request, res: Response) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email) {
            return res.status(400).json({ message: 'Email cannot be empty' });
        }
        if (!password) {
            return res
                .status(400)
                .json({ message: 'Password cannot be empty' });
        }
        const coreAdmin = await CoreAdmins.findOne({ where: { email } });
        if (coreAdmin && coreAdmin.password === password) {
            const { password: _, ...data } = coreAdmin.dataValues;
            req.session.adminUser = { ...data, type: 'central' };
            return res.status(200).json({ message: 'Login successful', data });
        }

        const regionalAdmin = await RegionalAdmins.findOne({
            where: { email },
        });
        if (regionalAdmin && regionalAdmin.password === password) {
            const { password: _, ...data } = regionalAdmin.dataValues;
            req.session.adminUser = { ...data, type: 'regional' };
            return res.status(200).json({ message: 'Login successful', data });
        }

        return res.status(401).json({ message: 'Invalid email or password.' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
