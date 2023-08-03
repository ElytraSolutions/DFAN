import { Request, Response } from 'express';
import UserProfile from '../../models/UserProfile';
import { unlink } from 'fs';

export default async function updatePicture(req: Request, res: Response) {
    if (!req.file) {
        return res.status(400).json({ message: 'Please provide a picture' });
    }
    const { filename } = req.file;
    const { id } = req.session.user!;
    const currentProfile = await UserProfile.findOne({
        where: {
            UserId: id,
        },
    });
    if (!currentProfile) {
        return res
            .status(400)
            .json({ message: 'Please create a profile first' });
    }
    if (currentProfile.avatar) {
        unlink(`public/avatars/${currentProfile.avatar}`, (error) => {
            if (error && error.code !== 'ENOENT') {
                console.log('Error in deleting file: ', error);
            }
        });
    }
    await UserProfile.update(
        {
            avatar: filename,
        },
        {
            where: {
                UserId: id,
            },
        },
    );
    return res.json({ message: 'Successfully update profile picture' });
}
