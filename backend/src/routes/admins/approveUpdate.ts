import { Request, Response } from 'express';
import UpdateRequest from '../../models/UpdateRequest';
import UserProfile from '../../models/UserProfile';

export default async function approveUpdate(req: Request, res: Response) {
    const id = req.body.id as string;
    const request = await UpdateRequest.findOne({
        where: { id },
    });
    if (!request) {
        return res.status(404).json({ message: 'Update request not found' });
    }
    try {
        await UserProfile.update(
            {
                [request.field]: request.newValue,
            },
            {
                where: { id: request.UserProfileId },
            },
        );
        await request.destroy();
        return res.json({ message: 'Update request approved' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
