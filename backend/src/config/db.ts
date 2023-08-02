import CoreAdmins from '../models/CoreAdmins';
import RegionalAdmins from '../models/RegionalAdmins';
import UserProfile from '../models/UserProfile';
import Users from '../models/Users';
import RegistrationList from '../models/RegistrationList';
import VerificationList from '../models/VerificationList';

export default async function config() {
    Users.hasOne(UserProfile);
    CoreAdmins.hasOne(UserProfile);
    RegionalAdmins.hasOne(UserProfile);

    UserProfile.hasOne(VerificationList);

    const alter = false;
    const force = false;

    await CoreAdmins.sync({ alter, force });
    await RegionalAdmins.sync({ alter, force });
    await RegistrationList.sync({ alter, force });
    await UserProfile.sync({ alter, force });
    await Users.sync({ alter, force });
    await VerificationList.sync({ alter, force });

    if (process.env.NODE_ENV !== 'production') {
        await CoreAdmins.findOrCreate({
            where: {
                email: 'admin@localhost.com',
                password: 'admin',
                name: 'Main Admin',
            },
        });
        const [regionalAdmin1, rcreated1] = await RegionalAdmins.findOrCreate({
            where: {
                email: 'rAdmin1@localhost.com',
                password: 'password',
                name: 'Regional Admin 1',
            },
        });
        if (rcreated1) {
            await regionalAdmin1.createUserProfile({
                name: 'Regional Admin 1',
                gender: 'Male',
                mobile: '11111',
                currentAddress: 'Current Address 1',
                permanentAddress: 'Permanent Address 1',
                membershipFrom: 'Bagmati Pradesh',
                employmentStatus: 'Unemployed',
                employmentType: undefined,
                NFAMembershipNumber: '111',
                isLifeMember: false,
                hasRenewed: false,
            });
        }
        const [regionalAdmin2, rcreated2] = await RegionalAdmins.findOrCreate({
            where: {
                email: 'rAdmin2@localhost.com',
                password: 'password',
                name: 'Regional Admin 2',
            },
        });
        if (rcreated2) {
            await regionalAdmin2.createUserProfile({
                name: 'Regional Admin 2',
                gender: 'Male',
                mobile: '11111',
                currentAddress: 'Current Address 1',
                permanentAddress: 'Permanent Address 1',
                membershipFrom: 'Koshi Pradesh',
                employmentStatus: 'Unemployed',
                employmentType: undefined,
                NFAMembershipNumber: '111',
                isLifeMember: false,
                hasRenewed: false,
            });
        }

        const [user1, created1] = await Users.findOrCreate({
            where: {
                email: 'user1@localhost.com',
                password: 'user1',
            },
        });
        if (created1) {
            await user1.createUserProfile({
                name: 'User 1',
                gender: 'Male',
                mobile: '11111',
                currentAddress: 'Current Address 1',
                permanentAddress: 'Permanent Address 1',
                membershipFrom: 'Bagmati Pradesh',
                employmentStatus: 'Unemployed',
                employmentType: undefined,
                NFAMembershipNumber: '111',
                isLifeMember: false,
                hasRenewed: false,
            });
        }
        const [user2, created2] = await Users.findOrCreate({
            where: {
                email: 'user2@localhost.com',
                password: 'user2',
            },
        });
        if (created2) {
            await user2.createUserProfile({
                name: 'User 2',
                gender: 'Female',
                mobile: '22222',
                currentAddress: 'Current Address 2',
                permanentAddress: 'Permanent Address 2',
                membershipFrom: 'Bagmati Pradesh',
                employmentStatus: 'Employed',
                employmentType: 'Non-Government Job',
                NFAMembershipNumber: undefined,
                isLifeMember: undefined,
                hasRenewed: undefined,
            });
        }
        const [user3, created3] = await Users.findOrCreate({
            where: {
                email: 'user3@localhost.com',
                password: 'user3',
            },
        });
        if (created3) {
            await user3.createUserProfile({
                name: 'User 3',
                gender: 'LGBTQ+',
                mobile: '33333',
                currentAddress: 'Current Address 3',
                permanentAddress: 'Permanent Address 3',
                membershipFrom: 'Koshi Pradesh',
                employmentStatus: 'Employed',
                employmentType: 'Government Job',
                NFAMembershipNumber: '333',
                isLifeMember: false,
                hasRenewed: false,
            });
        }
        const [user4, created4] = await Users.findOrCreate({
            where: {
                email: 'user4@localhost.com',
                password: 'user4',
            },
        });
        if (created4) {
            await user4.createUserProfile({
                name: 'User 4',
                gender: 'LGBTQ+',
                mobile: '44444',
                currentAddress: 'Current Address 4',
                permanentAddress: 'Permanent Address 4',
                membershipFrom: 'Koshi Pradesh',
                employmentStatus: 'Employed',
                employmentType: 'Government Job',
                NFAMembershipNumber: '444',
                isLifeMember: false,
                hasRenewed: false,
            });
        }
    }

}
