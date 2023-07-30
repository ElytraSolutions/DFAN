import { Request, Response } from 'express';
import sendEmail from '../../helpers/sendEmail';
import RegistrationList from '../../models/RegistrationList';

export default async function allowRegistration(req: Request, res: Response) {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: 'Email cannot be empty' });
    }
    await sendEmail(email);
    await RegistrationList.create({
        email: email,
        code: 'admin',
    });
    return res.status(200).json({ message: 'Registration allowed' });
}
