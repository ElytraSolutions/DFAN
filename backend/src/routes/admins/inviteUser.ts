import { Request, Response } from 'express';
import Joi from 'joi';
import crypto from 'crypto';
import sendEmail from '../../helpers/sendEmail';
import RegistrationList from '../../models/RegistrationList';
import { URLSearchParams } from 'url';
import Users from '../../models/Users';

interface RequestBody {
    email: string;
}
const schema = Joi.object<RequestBody>({
    email: Joi.string().email().required(),
});

export default async function inviteUser(req: Request, res: Response) {
    const { value, error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ message: 'Invalid parameters', errors: error.details });
    }
    const email = value.email;
    const existingUser = await Users.findOne({
        where: {
            email,
        },
    });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // TODO: remove if condition
    let code = crypto.randomBytes(4).toString('hex');
    if (process.env.NODE_ENV !== 'production') {
        code = '1234';
    }
    const queryParams = new URLSearchParams({
        email: email,
        code: code,
    });
    const host =
        process.env.NODE_ENV === 'production'
            ? req.get('host')
            : 'localhost:5173';
    const redirect = `${
        req.protocol
    }\://${host}/register?${queryParams.toString()}`;
    await sendEmail(email, 'codeTemplate', code, redirect);
    await RegistrationList.upsert({
        email: email,
        code: code,
    });
    return res
        .status(200)
        .json({ message: 'Registration allowed', data: { email, code } });
}
