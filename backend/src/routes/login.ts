import { Request, Response } from 'express';
import User from '../models/User';

export default async function login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email) {
        return res.status(400).json({ message: 'Email cannot be empty' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password cannot be empty' });
    }
    const user = await User.findOne({ where: { email } });
    if (user && user.password === password) {
        req.session.user = user;
        return res.status(200).json({ message: 'Login successful' });
    }
    return res.status(401).json({ message: 'Invalid email or password.' });
}
