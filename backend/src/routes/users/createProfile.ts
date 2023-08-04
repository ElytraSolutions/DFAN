import { Request, Response } from 'express';
import sequelize from '../../models/config';
import RegistrationList from '../../models/RegistrationList';
import Users from '../../models/Users';
import {
    sanitizer,
    UserProfileSchema,
} from '../../validations/ValidateUserProfile';
import UserProfile from '../../models/UserProfile';

export default async function createProfile(req: Request, res: Response) {
    // TODO: Assign new membership ID if there is no membership ID
    // TODO: Hash passwords
    try {
        const loggedInUser = req.session.user!;
        const user = await Users.findOne({
            where: {
                email: loggedInUser.email,
            },
        });
        if (!user) {
            req.session.user = undefined;
            return res.status(404).json({ message: 'User not found!' });
        }
        const currentProfile = await user.getUserProfile();
        if (currentProfile) {
            return res
                .status(403)
                .json({ message: 'User has already created profile!' });
        }
        const { value, error } = UserProfileSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ message: 'Invalid parameters', errors: error.details });
        }

        const profile = await sequelize.transaction(async (t) => {
            const profile = await user.createUserProfile(
                sanitizer(value) as unknown as UserProfile,
                { transaction: t },
            );
            RegistrationList.destroy({
                where: {
                    email: user.email,
                },
                transaction: t,
            });
            await profile.createVerificationList(
                {
                    status: 'pending',
                },
                { transaction: t },
            );
            return profile;
        });
        return res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
