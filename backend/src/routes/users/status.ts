import { Request, Response } from 'express';
import User from '../../models/Users';
import RegistrationList from '../../models/RegistrationList';

export default async function getStatus(req: Request, res: Response) {
    const email = req.query.email as string;
    if (!email) {
        return res.status(400).json({
            message: 'Email not provided',
        });
    }
    const user = await User.findOne({
        where: {
            email,
        },
        attributes: ['admin', 'hasInitailized'],
    });
    if (user) {
        return res.status(200).json({
            message: 'User found',
            data: {
                status: 'existingUser',
            }
        });
    }
    const registered = await RegistrationList.findOne({
        where: {
            email,
        },
    });
    if (!registered) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    return res.status(200).json({
        message: 'User found',
        data: {
            status: 'newUser',
            admin: false,
            hasInitailized: false,
        }
    });
}
