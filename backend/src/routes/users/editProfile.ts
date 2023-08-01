import { Request, Response } from 'express';
import Users from '../../models/Users';
import ValidateUserProfile, { sanitizer } from '../../validations/ValidateUserProfile';
import UserProfile from '../../models/UserProfile';

export default async function (req: Request, res: Response) {
    if (!req.session.user || !req.session.user.email) return res.status(401).json({ message: 'User should be logged in!' });
    const email = req.session.user.email;
    const user = await Users.findOne({
        where: {
            email
        },
        include: [
            {
                model: UserProfile,
                as: 'userProfile',
            },
        ],
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.userProfile) {
        return res.status(400).json({ user, message: 'User does not have a profile' });
    }
    try {
        const newProfile: any = user.userProfile.dataValues;
        for (const key in user.userProfile.dataValues) {
            if (key in req.body) {
                newProfile[key] = req.body[key];
            }
        }
        const error = ValidateUserProfile(newProfile);
        if (Object.keys(error).length > 0) {
            return res.status(400).json({ message: 'Incorrect parameters', data: error });
        }
        const sanitizedProfile = sanitizer(newProfile);
        /** @ts-ignore */
        const data = await UserProfile.update(sanitizedProfile, {
            where: {
                userId: user.id
            }
        });

        return res.status(200).json({ data, message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
