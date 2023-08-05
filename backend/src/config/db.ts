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

        await bulkCreate(0);
    }
}

async function bulkCreate(num: number) {
    const existingUsers = await Users.findOne({
        where: {
            role: 'User',
        },
    });
    if (existingUsers) {
        return;
    }
    const users = [];
    for (let i = 0; i < num; i++) {
        users.push({
            email: `user${i}.gmail.com`,
            password: 'password',
        });
    }
    const usersCreated = await Users.bulkCreate(users);
    const profiles = [];
    const genders = ['Male', 'Female', 'Others'];
    const states = ['Bagmati Pradesh', 'Koshi Pradesh'];
    for (let i = 0; i < num; i++) {
        profiles.push({
            name: `User ${i}`,
            gender: genders[i % 3],
            mobile: '1111111111',
            currentAddress: states[i % 2],
            permanentAddress: 'Nepal',
            membershipFrom: states[(i + 1) % 2],
            employmentStatus: 'Employed',
            employmentType: 'Government Job',
            NFAMembershipNumber: (i + 1).toString(),
            isLifeMember: true,
            UserId: usersCreated[i].id,
        });
    }
    const createdProfiles = await UserProfile.bulkCreate(profiles);
    const verificationLists = [];
    const statuses: Array<'approved' | 'pending' | 'rejected'> = [
        'approved',
        'pending',
        'rejected',
    ];
    for (let i = 0; i < num; i++) {
        if (i % 4 == 0 || i % 4 == 1) {
            verificationLists.push({
                UserProfileId: createdProfiles[i].id,
                status: statuses[0],
            });
        } else {
            verificationLists.push({
                UserProfileId: createdProfiles[i].id,
                status: statuses[1],
            });
        }
    }
    await VerificationList.bulkCreate(verificationLists);
}
