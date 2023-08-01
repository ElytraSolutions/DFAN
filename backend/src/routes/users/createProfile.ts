import { Request, Response } from 'express';
import RegistrationList from '../../models/RegistrationList';
import Users from '../../models/Users';
import ValidateUserProfile, { sanitizer } from '../../validations/ValidateUserProfile';
import UserProfile from '../../models/UserProfile';

export default async function (req: Request, res: Response) {
    const {
        name,
        gender,
        mobile,
        currentAddress,
        permanentAddress,
        membershipFrom,
        employmentStatus,
        employmentType,
        NFAMembershipNumber,
        isLifeMember,
        hasRenewed,
    } = req.body;
    try {
        const loggedInUser = req.session.user;
        if (!loggedInUser) {
            return res.status(401).json({ message: 'User should be logged in!' });
        }
        const user = await Users.findOne({
            where: {
                email: loggedInUser.email,
            }
        });
        if (!user) {
            req.session.user = null;
            return res.status(404).json({ message: 'User not found!' });
        }
        const currentProfile = await user.getUserProfile();
        if (currentProfile) {
            return res.status(403).json({ message: 'User has already created profile!' });
        }
        const newProfile = {
            name,
            gender,
            mobile,
            currentAddress,
            permanentAddress,
            membershipFrom,
            employmentStatus,
            employmentType,
            NFAMembershipNumber,
            isLifeMember,
            hasRenewed,
        };
        const error = ValidateUserProfile(newProfile);
        if (Object.keys(error).length > 0) {
            return res.status(400).json({ message: 'Incorrect parameters', data: error });
        }
        /** @ts-ignore */
        const profile = await user.createUserProfile(sanitizer(newProfile));
        RegistrationList.destroy({
            where: {
                email: user.email
            }
        });
        return res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
