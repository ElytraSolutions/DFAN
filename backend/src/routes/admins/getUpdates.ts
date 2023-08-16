import { Request, Response } from 'express';
import UpdateRequest from '../../models/UpdateRequest';
import UserProfile from '../../models/UserProfile';

export default async function getUpdates(req: Request, res: Response) {
    const requests = await UpdateRequest.findAll({
        include: UserProfile,
    });
    return res.json({ data: requests });
}
