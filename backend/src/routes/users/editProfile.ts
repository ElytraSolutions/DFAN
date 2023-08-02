import { Request, Response } from 'express';
import Users from '../../models/Users';
import {
    UserProfileSchema,
    sanitizer,
} from '../../validations/ValidateUserProfile';
import UserProfile from '../../models/UserProfile';

export default async function editProfile(req: Request, res: Response) {
    if (!req.session.user || !req.session.user.email)
        return res.status(401).json({ message: 'User should be logged in!' });
    const email = req.session.user.email;
    const user = await Users.findOne({
        where: {
            email,
        },
        include: [
            {
                model: UserProfile,
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
        delete newProfile.CoreAdminId;
        delete newProfile.RegionalAdminId;
        for (const key in user.UserProfile.dataValues) {
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
            .json({ data, message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Something went wrong', error: error });
    }
}
