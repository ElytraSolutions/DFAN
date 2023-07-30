import { Request, Response } from 'express';

export default async function logout(req: Request, res: Response) {
    req.session.user = null;
    return res.json({ message: 'Successfully logged out.' });
}
