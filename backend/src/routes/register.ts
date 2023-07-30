import { Request, Response } from 'express';
import User from '../models/User';

export default async function (req: Request, res: Response) {
    const email: string | undefined = req.body.email?.trim();
    const password: string | undefined = req.body.password;
    if (!email) {
        return res.status(400).json({ message: 'Email cannot be empty' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password cannot be empty' });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
        return res.status(400).json({ message: 'Email address already exists', data: user });
    }
    const newUser = await User.create({ email, password });
    return res.status(200).json({ message: 'Registration successful', data: newUser });
}
