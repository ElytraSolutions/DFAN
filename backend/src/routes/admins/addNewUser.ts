import { Request, Response } from 'express';
import User from '../../models/User';

export default async function (req: Request, res: Response) {
    const email = req.body.email;
    const user = await User.findOne({ where: { email } });
    if (user) {
        await User.update({ admin: true }, { where: { email } });
        return res.status(200).json({ message: 'User is now an admin' });
    }
    return res.status(400).json({ message: 'User not found' });
}
