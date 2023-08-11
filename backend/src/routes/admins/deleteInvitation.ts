import { Request, Response } from 'express';
import Joi from 'joi';
import RegistrationList from '../../models/RegistrationList';

interface RequestBody {
    email: string;
}
const schema = Joi.object<RequestBody>({
    email: Joi.string().email().required(),
});

export default async function inviteUser(req: Request, res: Response) {
    const { value, error } = schema.validate(req.params);
    if (error) {
        return res
            .status(400)
            .json({ message: 'Invalid parameters', errors: error.details });
    }
    const email = value.email;

    const existingInvitation = await RegistrationList.findOne({
        where: {
            email,
        },
    });
    if (!existingInvitation) {
        return res.status(400).json({ message: 'User not invited' });
    }
    await RegistrationList.destroy({
        where: {
            email,
        },
    });
    return res
        .status(200)
        .json({ message: 'Registration deleted successfully' });
}
