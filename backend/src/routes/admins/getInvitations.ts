import { Request, Response } from 'express';
import RegistrationList from '../../models/RegistrationList';

export default async function getInvitations(req: Request, res: Response) {
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

        const { rows, count } = await RegistrationList.findAndCountAll({
            limit,
            offset,
            where: filtersQuery ? JSON.parse(filtersQuery) : {},
        });
        return res.json({ data: rows, count });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
