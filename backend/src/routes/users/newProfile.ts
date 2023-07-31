import { Request, Response } from 'express';
import User from '../../models/User';
import RegistrationList from '../../models/RegistrationList';

export default async function (req: Request, res: Response) {
    const {
        email,
        password,
        code,
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
        const userCode = await RegistrationList.findOne({
            where: {
                email
            }
        });
        if (!userCode || userCode.code !== code) {
            return res.status(400).json({ message: 'Invalid email or code!' });
        }
        const newUser = await User.create({
            email,
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
        });
        req.session.user = newUser;
        RegistrationList.destroy({
            where: {
                email
            }
        });
        return res.status(200).json(newUser);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
