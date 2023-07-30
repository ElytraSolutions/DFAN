import { Request, Response } from 'express';
import RegistrationList from '../../models/RegistrationList';

export default async function (req: Request, res: Response) {
    const email: string | undefined = req.body.email?.trim();
    const code: string | undefined = req.body.code;
    if (!email) {
        return res.status(400).json({ message: 'Email cannot be empty' });
    }
    if (!code) {
        return res.status(400).json({ message: 'Code cannot be empty' });
    }
    const user = await RegistrationList.findOne({ where: { email } });
    if (!user || user.code !== code) {
        return res.status(400).json({ message: 'Email address or code is invalid' });
    }
    return res.status(200).json({ message: 'Verification successful' });
}
