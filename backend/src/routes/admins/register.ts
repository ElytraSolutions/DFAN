import { Request, Response } from 'express';
import Users from '../../models/Users';
import Joi from 'joi';

const AdminRegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string()
        .allow('Central Admin', 'Regional Admin')
        .only()
        .required(),
});

export default async function register(req: Request, res: Response) {
    const { value, error } = AdminRegisterSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ message: 'Invalid parameters', errors: error.details });
    }
    const { email, password, role } = value;

    const currAdmin = req.session.user;
    if (role === 'Central Admin') {
        if (!currAdmin || currAdmin.role !== 'Central Admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    const currentUser = await Users.findOne({
        where: { email },
    });
    if (currentUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    const newAdmin = await Users.create({
        email,
        password,
        role,
    });
    const { password: _, ...data } = newAdmin.dataValues;
    return res
        .status(200)
        .json({ message: 'Admin created successfully', data });
}
