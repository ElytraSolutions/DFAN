import { Request, Response } from 'express';

export default function verifyUserProfile(req: Request, res: Response) {
    const id = req.body.id;
    if (!id) {
        return res.status(400).json({ message: 'ID cannot be empty' });
    }

    const verificationStatus = req.body.verificationStatus;
    if (verificationStatus !== 'verified' && verificationStatus !== 'rejected') {
        return res.status(400).json({ message: 'Invalid verification status' });
    }
    return res.status(200).json({ message: 'OK' });
}
