import { Request, Response } from 'express';
import Users from '../../models/Users';
import {
    UserProfileSchema,
    sanitizer,
} from '../../validations/ValidateUserProfile';
import UserProfile from '../../models/UserProfile';
import VerificationList from '../../models/VerificationList';

export default async function editProfile(req: Request, res: Response) {
    const email = req.session.user!.email;
    const user = await Users.findOne({
        where: {
            email,
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
    if (user.UserProfile.VerificationList?.status === 'pending') {
        return res
            .status(400)
            .json({ message: 'User profile is not verified' });
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
        console.log(newProfile);
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
        await VerificationList.update(
            {
                status: 'pending',
            },
            {
                where: {
                    id: user.UserProfile.VerificationList?.id,
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
