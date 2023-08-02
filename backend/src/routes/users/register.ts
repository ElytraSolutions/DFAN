import { Request, Response } from 'express';
import Users from '../../models/Users';
import RegistrationList from '../../models/RegistrationList';

export default async function register(req: Request, res: Response) {
    const email: string | undefined = req.body.email?.trim();
    const password: string | undefined = req.body.password;
    const code: string | undefined = req.body.code;
    if (!email) {
        return res.status(400).json({ message: 'Email cannot be empty' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password cannot be empty' });
    }
    if (!code) {
        return res.status(400).json({ message: 'Code cannot be empty' });
    }

    const pendingUser = await RegistrationList.findOne({ where: { email } });
    if (!pendingUser || pendingUser.code !== code) {
        return res.status(400).json({ message: 'Invalid email or code!' });
    }
    const user = await Users.findOne({ where: { email } });
    if (user) {
        return res.status(400).json({ message: 'Email address already exists', data: user });
    }
    const newUser = await Users.create({ email, password });
    return res.status(200).json({ message: 'Registration successful', data: newUser });
}
