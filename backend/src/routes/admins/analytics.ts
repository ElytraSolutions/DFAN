import { Request, Response } from 'express';
import UserProfile from '../../models/UserProfile';
import sequelize from '../../models/config';

function groupAndCount(category: any) {
    return async function () {
        return await UserProfile.findAll({
            group: category,
            attributes: [category, [sequelize.fn('COUNT', '*'), 'count']],
        });
    };
}

const filters = {
    gender: groupAndCount('gender'),
    membershipFrom: groupAndCount('membershipFrom'),
    employmentStatus: groupAndCount('employmentStatus'),
    employmentType: groupAndCount('employmentType'),
    isLifeMember: groupAndCount('isLifeMember'),
    totalUsers: async function () {
        const [results] = await sequelize.query(
            'SELECT strftime("%Y %m",createdAt) AS joinDate, SUM(COUNT(*)) OVER (ORDER BY strftime("%Y %m",createdAt)) AS sum FROM UserProfiles GROUP BY strftime("%Y %m",createdAt);',
        );
        return results;
    },
    newRegistrations: async function () {
        const [results] = await sequelize.query(
            'SELECT strftime("%Y %m",createdAt) AS joinDate, COUNT(*) AS count FROM UserProfiles GROUP BY strftime("%Y %m",createdAt);',
        );
        return results;
    },
};

async function analytics(req: Request, res: Response) {
    const category = req.query.category;
    if (!category) {
        return res.status(400).json({ message: 'Missing category' });
    }
    if (!Object.keys(filters).includes(category as string)) {
        return res.status(400).json({ message: 'Invalid category' });
    }
    const callback = filters[category as keyof typeof filters];
    try {
        const result = await callback();
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

export default analytics;
