import { Request, Response } from 'express';
import User from '../../models/Users';
import RegistrationList from '../../models/RegistrationList';
import Joi from 'joi';

const schema = Joi.object({
    email: Joi.string().email().required(),
});

export default async function status(req: Request, res: Response) {
    const { value, error } = schema.validate(req.query);
    if (error) {
        return res
            .status(400)
            .json({ message: 'Invalid parameters', errors: error.details });
    }
    const { email } = value;

    const user = await User.findOne({
        where: {
            email,
        },
    });
    if (user) {
        return res.status(200).json({
            message: 'User has already registered',
            data: {
                invited: false,
                registered: true,
            },
        });
    }
    const registered = await RegistrationList.findOne({
        where: {
            email,
        },
    });
    if (!registered) {
        return res.status(404).json({
            message: 'User has not been invited',
            data: {
                invited: false,
                registered: false,
            },
        });
    }
    return res.status(200).json({
        message: 'User has been invited',
        data: {
            invited: true,
            registered: false,
        },
    });
}
