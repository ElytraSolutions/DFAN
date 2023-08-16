import { Request, Response } from 'express';
import Joi from 'joi';
import Users from '../../models/Users';

interface RequestBody {
    oldPassword: string;
    password: string;
}
const schema = Joi.object<RequestBody>({
    oldPassword: Joi.string().required(),
    password: Joi.string().required(),
});

export default async function changePassword(req: Request, res: Response) {
    try {
        if (!req.session?.user) {
            return res.status(400).json({ message: 'User is not logged in' });
        }
        const { value, error } = schema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ message: 'Invalid parameters', errors: error.details });
        }
        const { oldPassword, password } = value;

        const user = await Users.findOne({
            where: { id: req.session.user.id },
        });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (user.password !== oldPassword) {
            return res
                .status(400)
                .json({ message: 'Old password is incorrect' });
        }
        await user.update({ password });
        return res.status(200).json({ message: 'Password has been updted' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
