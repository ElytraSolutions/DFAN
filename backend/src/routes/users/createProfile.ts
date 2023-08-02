import { Request, Response } from 'express';
import RegistrationList from '../../models/RegistrationList';
import Users from '../../models/Users';
import {
    sanitizer,
    UserProfileSchema,
} from '../../validations/ValidateUserProfile';
import UserProfile from '../../models/UserProfile';

export default async function createProfile(req: Request, res: Response) {
    // TODO: Assign new membership ID if there is no membership ID
    try {
        const loggedInUser = req.session.user;
        if (!loggedInUser) {
            return res
                .status(401)
                .json({ message: 'User should be logged in!' });
        }
        const user = await Users.findOne({
            where: {
                email: loggedInUser.email,
            },
        });
        if (!user) {
            req.session.user = null;
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

        const profile = await user.createUserProfile(
            sanitizer(value) as unknown as UserProfile,
        );
        RegistrationList.destroy({
            where: {
                email: user.email,
            },
        });
        await profile.createVerificationList({
            status: 'pending',
        });
        return res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
