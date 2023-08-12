import { Request, Response } from 'express';
import VerificationList from '../../models/VerificationList';
import Joi from 'joi';
import UserProfile from '../../models/UserProfile';
import Users from '../../models/Users';

const rejectUserSchema = Joi.object({
    email: Joi.string().required(),
});

export default async function rejectUser(req: Request, res: Response) {
    const { value, error } = rejectUserSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({ message: 'Invalid parameters', errors: error.details });
    }

    const verifyRecord = await Users.findOne({
        include: [
            {
                model: UserProfile,
                include: [
                    {
                        model: VerificationList,
                    },
                ],
            },
        ],
        where: {
            email: value.email,
        },
    });

    if (!verifyRecord) {
        return res.status(404).json({ message: 'Profile not found' });
    }
    const status = verifyRecord.UserProfile?.VerificationList?.status;
    if (status !== 'pending') {
        return res
            .status(400)
            .json({ message: 'Profile is already accepted or rejected' });
    }
    await VerificationList.update(
        {
            status: 'rejected',
        },
        {
            where: {
                id: verifyRecord.UserProfile?.VerificationList?.id,
            },
        },
    );
    return res.status(200).json({ message: 'User has been rejected' });
}
