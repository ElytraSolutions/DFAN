import { Request, Response } from 'express';
import Joi from 'joi';
import crypto from 'crypto';
import Users from '../../models/Users';
import States from '../../../public/data/States.json';
import sendEmail from '../../helpers/sendEmail';

interface RequestBody {
    name: string;
    email: string;
    role: 'Central Admin' | 'Regional Admin';
    region: keyof typeof States;
}
const schema = Joi.object<RequestBody>({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Please provide a valid email address',
        'string.email': 'Please provide a valid email address',
    }),
    role: Joi.string()
        .allow('Central Admin', 'Regional Admin')
        .only()
        .required(),
    region: Joi.when('role', {
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
    const { name, email, role, region } = value;

    const user = await Users.findOne({
        where: { email },
        attributes: {
            exclude: ['password'],
        },
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
    const password = crypto.randomBytes(16).toString('hex');
    const newUser = await Users.create({
        email,
        password,
        role,
        region: region ? region : null,
    });
    const newProfile = await newUser.createUserProfile({
        name: value.name,
        avatar: 'default.svg',
    });
    await newProfile.createVerificationList({
        status: 'approved',
    });
    const host =
        process.env.NODE_ENV === 'production'
            ? req.get('host')
            : 'localhost:5173';
    const url = `${req.protocol}\://${host}/login?email=${email}`;
    const position =
        role === 'Regional Admin' ? role + ` of ${String(region)}` : role;
    await sendEmail(email, 'inviteAdminTemplate', {
        name,
        role: position,
        password,
        url,
    });
    const { password: _password, ...rest } = newUser;

    return res
        .status(200)
        .json({ message: 'New User has been created', data: rest });
}
