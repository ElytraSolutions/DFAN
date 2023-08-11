import { Request, Response } from 'express';
import Users from '../../models/Users';
import UserProfile from '../../models/UserProfile';
import VerificationList from '../../models/VerificationList';

export default async function getUser(req: Request, res: Response) {
    try {
        const userData = await Users.findOne({
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
        const isRegionalAdmin = req.session?.user?.role === 'Regional Admin';
        if (isRegionalAdmin) {
            const regionalUserData = await Users.findOne({
                where: {
                    id: req.session?.user?.id,
                },
                include: UserProfile,
            });
            if (!regionalUserData) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (!regionalUserData.UserProfile) {
                return res
                    .status(400)
                    .json({ message: 'User profile is not initialized' });
            }
            if (
                regionalUserData.UserProfile.membershipFrom !==
                userData?.UserProfile?.membershipFrom
            ) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }
        return res.json({ data: userData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
