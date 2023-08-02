import { Request, Response } from 'express';
import Users from '../../models/Users';
import { Op } from 'sequelize';
import UserProfile from '../../models/UserProfile';
import VerificationList from '../../models/VerificationList';
import RegionalAdmins from '../../models/RegionalAdmins';

export default async function getUsers(req: Request, res: Response) {
    try {
        let limit = 10;
        const limitQuery = parseInt(req.query.limit as string);
        if (!isNaN(limitQuery)) {
            limit = Math.max(1, Math.min(100, limitQuery));
        }
        let offset = 0;
        const offsetQuery = parseInt(req.query.offset as string);
        if (!isNaN(offsetQuery)) {
            offset = Math.max(0, offsetQuery);
        }
        const filtersQuery = req.query.filters as string;
        const filters = filtersQuery ? JSON.parse(filtersQuery) : {};

        const regionFilter: any = {};
        const isRegionalAdmin = req.session.adminUser.type !== 'central';
        if (isRegionalAdmin) {
            const regionalUserData = await RegionalAdmins.findOne({
                where: {
                    id: req.session.adminUser.id,
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
            regionFilter.membershipFrom =
                regionalUserData.UserProfile.membershipFrom;
        }

        const usersFilter: any = {};
        if (filters.email) {
            usersFilter.email = {
                [Op.like]: `%${filters.email}%`,
            };
        }

        const verified = req.query.verified as string;
        const verifiedFilter: any = {};
        if (
            verified === 'pending' ||
            verified === 'approved' ||
            verified === 'rejected'
        ) {
            verifiedFilter.status = verified;
        }

        const data = await Users.findAll({
            limit,
            offset,
            where: filters,
            include: [
                {
                    model: UserProfile,
                    include: [
                        {
                            model: VerificationList,
                            where: verifiedFilter,
                        },
                    ],
                    where: regionFilter,
                },
            ],
        });
        return res.json({ data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
