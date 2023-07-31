import { Request, Response } from 'express';

export default async function loggedInUserData(req: Request, res: Response) {
    const status = req.session.user ? 200 : 401;
    return res.status(status).json(req.session.user);
}
