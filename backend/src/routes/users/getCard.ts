import { Request, Response } from 'express';
import { Stream } from 'stream';
import createCard from '../../helpers/createCard';
import Users from '../../models/Users';
import UserProfile from '../../models/UserProfile';

async function getCard(req: Request, res: Response) {
    try {
        const id = req.session.user?.id;
        if (!id) {
            return res.status(400).json({ message: 'User is not logged in' });
        }
        const user = await Users.findOne({
            where: { id },
            include: [UserProfile],
        });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const userProfile = user.UserProfile;
        if (!userProfile) {
            return res.status(400).json({ message: 'User profile not found' });
        }
        const {
            NFAMembershipNumber,
            name,
            gender,
            mobile,
            permanentAddress: address,
            membershipType: type,
            avatar: image,
        } = userProfile;
        const card = await createCard({
            fileName: id,
            id: NFAMembershipNumber,
            name,
            gender: gender || '',
            mobile: mobile || '',
            address: address || '',
            type: type || 'General Member',
            image,
        });
        const readStream = new Stream.PassThrough();
        readStream.end(card);
        res.set(
            'Content-disposition',
            `attachment; filename=DigitalCardDFAN.pdf`,
        );
        res.set('Content-Type', 'application/pdf');
        return readStream.pipe(res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

export default getCard;
