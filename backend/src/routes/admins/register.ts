import { Request, Response } from 'express';
import CoreAdmins from '../../models/CoreAdmins';
import RegionalAdmins from '../../models/RegionalAdmins';

export default async function register(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const type = req.body.type;
    if (!email) {
        return res.status(400).json({ message: 'Email cannot be empty' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password cannot be empty' });
    }
    if (!name) {
        return res.status(400).json({ message: 'Name cannot be empty' });
    }
    if (!type) {
        return res.status(400).json({ message: 'Type cannot be empty' });
    }

    if (type === 'central') {
        const currAdmin = req.session.adminUser;
        if (!currAdmin || currAdmin.type !== 'central') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const coreAdmin = await CoreAdmins.findOne({ where: { email } });
        if (coreAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newAdmin = await CoreAdmins.create({ email, password, name });
        const { password: _, ...data } = newAdmin.dataValues;
        return res
            .status(200)
            .json({ message: 'Admin created successfully', data });
    } else if (type === 'regional') {
        const currAdmin = req.session.adminUser;
        if (!currAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const regAdmin = await RegionalAdmins.findOne({ where: { email } });
        if (regAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newAdmin = await RegionalAdmins.create({ email, password, name });
        const { password: _, ...data } = newAdmin.dataValues;
        return res
            .status(200)
            .json({ message: 'Admin created successfully', data });
    }
    return res.status(400).json({ message: 'Invalid type' });
}
