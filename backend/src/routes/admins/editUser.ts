import { Request, Response } from 'express';
import Users from '../../models/Users';
import { UserProfileSchema, sanitizer } from '../../validations/UserProfile';
import UserProfile from '../../models/UserProfile';
import VerificationList from '../../models/VerificationList';

export default async function editUser(req: Request, res: Response) {
    const user = await Users.findOne({
        where: {
            id: req.params.id,
        },
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
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.UserProfile) {
        return res
            .status(400)
            .json({ user, message: 'User does not have a profile' });
    }

    try {
        const newProfile: any = { ...user.UserProfile.dataValues };
        delete newProfile.id;
        delete newProfile.createdAt;
        delete newProfile.updatedAt;
        delete newProfile.UserId;
        delete newProfile.VerificationList;
        for (const key in newProfile) {
            if (key in req.body) {
                newProfile[key] = req.body[key];
            }
        }
        const { value, error } = UserProfileSchema.validate(newProfile, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                message: 'Incorrect parameters',
                errors: error.details,
            });
        }
        const sanitizedProfile = sanitizer(value);
        const data = await UserProfile.update(
            sanitizedProfile as unknown as UserProfile,
            {
                where: {
                    UserId: user.id,
                },
            },
        );

        return res
            .status(200)
            .json({ message: 'Profile updated successfully', data });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Something went wrong', error: error });
    }
}
