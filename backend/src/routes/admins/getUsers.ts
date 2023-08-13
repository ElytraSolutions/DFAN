import { Request, Response } from 'express';
import Users from '../../models/Users';
import { Op } from 'sequelize';
import UserProfile from '../../models/UserProfile';
import VerificationList from '../../models/VerificationList';

export default async function getUsers(req: Request, res: Response) {
    try {
        let limit = null;
        const limitQuery = parseInt(req.query.limit as string, 10);
        if (!isNaN(limitQuery)) {
            limit = Math.max(1, limitQuery);
        }
        let offset = null;
        const offsetQuery = parseInt(req.query.offset as string, 10);
        if (!isNaN(offsetQuery)) {
            offset = Math.max(0, offsetQuery);
        }
        const limitOffset: { limit?: number; offset?: number } = {};
        if (limit) {
            limitOffset['limit'] = limit;
        }
        if (offset) {
            limitOffset['offset'] = offset;
        }

        const filtersQuery = req.query.filters as string;
        const filters = filtersQuery ? JSON.parse(filtersQuery) : {};

        const usersFilter: any = {};
        if (filters.id) {
            usersFilter.id = filters.id;
            delete filters.id;
        }
        if (filters.email) {
            usersFilter.email = {
                [Op.like]: `%${filters.email}%`,
            };
            delete filters.email;
        }
        if (filters.id) {
            usersFilter.id = filters.id;
            delete filters.id;
        }
        if (filters.role) {
            usersFilter.role = filters.role;
            delete filters.role;
        }
        if (filters.region) {
            usersFilter.region = filters.region;
            delete filters.region;
        }

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
            filters.membershipFrom = regionalUserData.region;
            usersFilter.region = [regionalUserData.region, null];
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

        const { rows, count } = await Users.findAndCountAll({
            ...limitOffset,
            where: usersFilter,
            include: [
                {
                    model: UserProfile,
                    include: [
                        {
                            model: VerificationList,
                            where: verifiedFilter,
                        },
                    ],
                    where: filters,
                },
            ],
            attributes: {
                exclude: ['password'],
            },
        });
        return res.json({ data: rows, count });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
