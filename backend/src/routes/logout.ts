import { Request, Response } from 'express';

export default async function logout(req: Request, res: Response) {
    req.session.user = undefined;
    return res.json({ message: 'Successfully logged out.' });
}
