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

function groupAndSum(category: any) {
    return async function () {
        const [results] = await sequelize.query(
            `SELECT \`${category}\`, COUNT(*) AS count, SUM(COUNT(*)) OVER (ORDER BY \`${category}\`) AS sum FROM UserProfiles GROUP BY \`${category}\` ORDER BY \`${category}\`;`,
        );
        console.log('RESULT', results);
        return results;
        return await UserProfile.findAll({
            group: category,
            attributes: [
                category,
                [sequelize.fn('COUNT', '*'), 'count'],
                [sequelize.fn('SUM', sequelize.fn('COUNT', '*')), 'sum'],
            ],
            order: [sequelize.col(category)],
        });
    };
}
const filters = {
    gender: groupAndCount('gender'),
    membershipFrom: groupAndCount('membershipFrom'),
    employmentStatus: groupAndCount('employmentStatus'),
    employmentType: groupAndCount('employmentType'),
    isLifeMember: groupAndCount('isLifeMember'),
    createdAt: groupAndSum('createdAt'),
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
