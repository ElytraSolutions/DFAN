import { Request, Response } from 'express';
import Users from '../../models/Users';

export default async function login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email) {
        return res.status(400).json({ message: 'Email cannot be empty' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password cannot be empty' });
    }
    const user = await Users.findOne({ where: { email } });
    if (user && user.password === password) {
        const { password, ...data } = user.dataValues;
        req.session.user = data;
        return res.status(200).json({ message: 'Login successful', data });
    }
    return res.status(401).json({ message: 'Invalid email or password.' });
}
