import RegistrationList from '../models/RegistrationList';
import UserProfile from '../models/UserProfile';
import Users from '../models/Users';
import VerificationList from '../models/VerificationList';

export default async function config() {
    Users.hasOne(UserProfile);
    UserProfile.belongsTo(Users);

    UserProfile.hasOne(VerificationList);
    VerificationList.belongsTo(UserProfile);

    const alter = false;
    const force = false;

    await RegistrationList.sync({ alter, force });
    await UserProfile.sync({ alter, force });
    await Users.sync({ alter, force });
    await VerificationList.sync({ alter, force });

    // TODO: Remove this
    if (process.env.NODE_ENV !== 'production') {
        await Users.findOrCreate({
            where: {
                email: 'admin@gmail.com',
                password: 'password',
                role: 'Central Admin',
            },
        });
        const [regionalAdmin1, rcreated1] = await Users.findOrCreate({
            where: {
                email: 'rAdmin1@gmail.com',
                password: 'password',
                role: 'Regional Admin',
            },
        });
        if (rcreated1) {
            const profile = await regionalAdmin1.createUserProfile({
                name: 'Regional Admin 1',
                gender: 'Male',
                mobile: '11111',
                currentAddress: 'Bagmati Pradesh',
                permanentAddress: 'Nepal',
                membershipFrom: 'Bagmati Pradesh',
                employmentStatus: 'Unemployed',
                employmentType: undefined,
                NFAMembershipNumber: '111',
                isLifeMember: false,
                hasRenewed: false,
            });
            await profile.createVerificationList({});
        }
        const [regionalAdmin2, rcreated2] = await Users.findOrCreate({
            where: {
                email: 'rAdmin2@gmail.com',
                password: 'password',
                role: 'Regional Admin',
            },
        });
        if (rcreated2) {
            const profile = await regionalAdmin2.createUserProfile({
                name: 'Regional Admin 2',
                gender: 'Male',
                mobile: '11111',
                currentAddress: 'Koshi Pradesh',
                permanentAddress: 'Nepal',
                membershipFrom: 'Koshi Pradesh',
                employmentStatus: 'Unemployed',
                employmentType: undefined,
                NFAMembershipNumber: '111',
                isLifeMember: false,
                hasRenewed: false,
            });
            await profile.createVerificationList({});
        }

        const [user1, created1] = await Users.findOrCreate({
            where: {
                email: 'user1@gmail.com',
                password: 'password',
            },
        });
        if (created1) {
            const user1Profile = await user1.createUserProfile({
                name: 'User 1',
                gender: 'Male',
                mobile: '11111',
                currentAddress: 'Bagmati Pradesh',
                permanentAddress: 'Nepal',
                membershipFrom: 'Bagmati Pradesh',
                employmentStatus: 'Unemployed',
                employmentType: undefined,
                NFAMembershipNumber: '111',
                isLifeMember: false,
                hasRenewed: false,
            });
            await user1Profile.createVerificationList({});
        }
        const [user2, created2] = await Users.findOrCreate({
            where: {
                email: 'user2@gmail.com',
                password: 'password',
            },
        });
        if (created2) {
            const user2Profile = await user2.createUserProfile({
                name: 'User 2',
                gender: 'Female',
                mobile: '22222',
                currentAddress: 'Bagmati Pradesh',
                permanentAddress: 'Nepal',
                membershipFrom: 'Bagmati Pradesh',
                employmentStatus: 'Employed',
                employmentType: 'Non-Government Job',
                NFAMembershipNumber: undefined,
                isLifeMember: undefined,
                hasRenewed: undefined,
            });
            await user2Profile.createVerificationList({});
        }
        const [user3, created3] = await Users.findOrCreate({
            where: {
                email: 'user3@gmail.com',
                password: 'password',
            },
        });
        if (created3) {
            const user3Profile = await user3.createUserProfile({
                name: 'User 3',
                gender: 'LGBTQ+',
                mobile: '33333',
                currentAddress: 'Koshi Pradesh',
                permanentAddress: 'Nepal',
                membershipFrom: 'Koshi Pradesh',
                employmentStatus: 'Employed',
                employmentType: 'Government Job',
                NFAMembershipNumber: '333',
                isLifeMember: false,
                hasRenewed: false,
            });
            await user3Profile.createVerificationList({});
        }
        const [user4, created4] = await Users.findOrCreate({
            where: {
                email: 'user4@gmail.com',
                password: 'password',
            },
        });
        if (created4) {
            const user4Profile = await user4.createUserProfile({
                name: 'User 4',
                gender: 'LGBTQ+',
                mobile: '44444',
                currentAddress: 'Koshi Pradesh',
                permanentAddress: 'Nepal',
                membershipFrom: 'Koshi Pradesh',
                employmentStatus: 'Employed',
                employmentType: 'Government Job',
                NFAMembershipNumber: '444',
                isLifeMember: false,
                hasRenewed: false,
            });
            await user4Profile.createVerificationList({});
        }
    }
}
