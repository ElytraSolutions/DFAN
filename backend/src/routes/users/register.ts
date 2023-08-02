import { Request, Response } from 'express';
import Joi from 'joi';
import Users from '../../models/Users';
import RegistrationList from '../../models/RegistrationList';

interface RequestBody {
    email: string;
    password: string;
    code: string;
}
const schema = Joi.object<RequestBody>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    code: Joi.string().required(),
});

export default async function register(req: Request, res: Response) {
    const { value, error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ message: 'Invalid parameters', errors: error.details });
    }
    const { email, password, code } = value;

    const pendingUser = await RegistrationList.findOne({ where: { email } });
    if (!pendingUser || pendingUser.code !== code) {
        return res.status(400).json({ message: 'Invalid email or code!' });
    }
    const user = await Users.findOne({ where: { email } });
    if (user) {
        return res
            .status(400)
            .json({ message: 'Email address already exists', data: user });
    }
    const newUser = await Users.create({ email, password });
    return res
        .status(200)
        .json({ message: 'Registration successful', data: newUser });
}
