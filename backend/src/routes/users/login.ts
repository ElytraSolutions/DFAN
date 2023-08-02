import { Request, Response } from 'express';
import Users from '../../models/Users';
import Joi from 'joi';

interface RequestBody {
    email: string;
    password: string;
}
const schema = Joi.object<RequestBody>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export default async function login(req: Request, res: Response) {
    const { value, error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ message: 'Invalid parameters', errors: error.details });
    }
    const { email, password } = value;
    const user = await Users.findOne({ where: { email } });
    if (user && user.password === password) {
        const { password: _, ...data } = user.dataValues;
        req.session.user = data;
        return res.status(200).json({ message: 'Login successful', data });
    }
    return res.status(401).json({ message: 'Invalid email or password.' });
}
