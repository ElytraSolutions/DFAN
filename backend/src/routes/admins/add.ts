import { Request, Response } from 'express';
import Joi from 'joi';
import Users from '../../models/Users';
import States from '../../../public/data/States.json';

interface RequestBody {
    email: string;
    role: 'Central Admin' | 'Regional Admin';
    region: keyof typeof States;
}
const schema = Joi.object<RequestBody>({
    email: Joi.string().email().required().messages({
        'string.empty': 'Please provide a valid email address',
        'string.email': 'Please provide a valid email address',
    }),
    role: Joi.string()
        .allow('Central Admin', 'Regional Admin')
        .only()
        .required(),
    region: Joi.when('type', {
        is: 'Regional Admin',
        then: Joi.any()
            .valid(...States)
            .required()
            .messages({
                'any.only': 'The region provided is not valid',
                'any.allowOnly': 'The region provided is not valid',
                'any.required': 'Region is required for Regional Admin',
            }),
        otherwise: Joi.any().forbidden().messages({
            'any.unknown': 'Region is not required for Central Admin',
        }),
    }),
});

export default async function addAdmin(req: Request, res: Response) {
    const { value, error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ message: 'Invalid parameters', errors: error.details });
    }
    const { email, role, region } = value;

    const user = await Users.findOne({
        where: { email },
    });

    if (user) {
        await user.update(
            {
                role,
                region: region ? region : null,
            },
            {
                where: {
                    id: user.id,
                },
            },
        );
        return res
            .status(200)
            .json({ message: 'User has been promoted to admin', data: user });
    }

    return res.status(404).json({ message: 'Cannot find user' });
}
