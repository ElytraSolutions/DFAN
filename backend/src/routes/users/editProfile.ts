import { Request, Response } from 'express';
import Users from '../../models/Users';
import { UserProfileSchema, sanitizer } from '../../validations/UserProfile';
import UserProfile from '../../models/UserProfile';
import VerificationList from '../../models/VerificationList';
import UpdateRequests from '../../models/UpdateRequest';
import { InferAttributes } from 'sequelize';

export default async function editProfile(req: Request, res: Response) {
    const email = req.session.user!.email;
    const user = await Users.findOne({
        where: {
            email,
        },
        include: [
            {
                model: UserProfile,
                include: [
                    {
                        model: VerificationList,
                    },
                ],
            },
        ],
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const userProfile = user.UserProfile;
    if (!userProfile) {
        return res
            .status(400)
            .json({ user, message: 'User does not have a profile' });
    }
    if (userProfile.VerificationList?.status === 'pending') {
        return res
            .status(400)
            .json({ message: 'User profile is not verified' });
    }
    try {
        const newProfile: any = { ...userProfile.dataValues };
        delete newProfile.id;
        delete newProfile.createdAt;
        delete newProfile.updatedAt;
        delete newProfile.UserId;
        delete newProfile.VerificationList;
        for (const key in newProfile) {
            if (key in req.body) {
                newProfile[key] = req.body[key];
            }
        }
        const { value, error } = UserProfileSchema.validate(newProfile, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                message: 'Incorrect parameters',
                errors: error.details,
            });
        }
        const sanitizedProfile = sanitizer(value);
        // const data = await UserProfile.update(
        //     sanitizedProfile as unknown as UserProfile,
        //     {
        //         where: {
        //             UserId: user.id,
        //         },
        //     },
        // );

        await UpdateRequests.destroy({
            where: {
                UserProfileId: user.UserProfile?.id,
            },
        });
        const updates: any[] = [];
        await Object.entries(sanitizedProfile).map(async ([key, value]) => {
            const field = key as unknown as keyof InferAttributes<
                UserProfile,
                { omit: never }
            >;
            if (sanitizedProfile[key] !== user.UserProfile?.dataValues[field]) {
                updates.push({
                    field: key,
                    oldValue: user.UserProfile?.dataValues[field] as string,
                    newValue: value,
                    UserProfileId: userProfile.id,
                });
            }
        });
        await UpdateRequests.bulkCreate(updates);

        return res
            .status(200)
            .json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Something went wrong', error: error });
    }
}
