import { Request, Response } from 'express';

export default async function loggedInUserData(req: Request, res: Response) {
    console.log('sending user data', req.session);
    return res.json(req.session.user);
}
