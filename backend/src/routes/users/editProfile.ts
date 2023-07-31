import { Request, Response } from 'express';
import User from '../../models/User';
import RegistrationList from '../../models/RegistrationList';

export default async function (req: Request, res: Response) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!req.session.user) return res.status(401).json({ message: 'User should be logged in!' });
    if (req.session.user.email !== email) return res.status(403).json({ message: 'User is not authorized to perform this action!' });
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) return res.status(404).json({ message: 'User not found!' });
    const newUserData = {
        ...user,
        ...req.body,
    }
    const {
        password,
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
    }: User = newUserData;
    try {
        const updatedUser = await User.update({
            password,
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
        }, {
            where: {
                email
            }
        });
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
