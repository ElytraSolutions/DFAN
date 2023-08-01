import { Request, Response } from 'express';
import crypto from 'crypto';
import sendEmail from '../../helpers/sendEmail';
import RegistrationList from '../../models/RegistrationList';
import { URLSearchParams } from 'url';

export default async function allowRegistration(req: Request, res: Response) {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: 'Email cannot be empty' });
    }
    const code = crypto.randomBytes(4).toString('hex');
    const queryParams = new URLSearchParams({
        email: email,
        code: code,
    });
    const host = process.env.NODE_ENV === 'production' ? req.get('host') : 'localhost:5173';
    const redirect = `${req.protocol}\://${host}/newProfile?${queryParams.toString()}`;
    // await sendEmail(email, 'codeTemplate', code, redirect);
    await RegistrationList.upsert({
        email: email,
        code: code,
    });
    return res.status(200).json({ message: 'Registration allowed', data: { email, code } });
}
