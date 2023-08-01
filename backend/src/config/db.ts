import CoreAdmins from '../models/CoreAdmins';
import RegionalAdmins from '../models/RegionalAdmins';
import UserProfile from '../models/UserProfile';
import Users from '../models/Users';
import RegistrationList from '../models/RegistrationList';
import VerificationList from '../models/VerificationList';

export default async function config() {
    Users.hasOne(UserProfile, {
        foreignKey: 'userId',
        as: 'userProfile',
    });

    UserProfile.belongsTo(Users, {
        foreignKey: 'userId',
        as: 'user',
    });

    const alter = false;
    const force = false;

    await CoreAdmins.sync({ alter, force });
    await RegionalAdmins.sync({ alter, force });
    await RegistrationList.sync({ alter, force });
    await Users.sync({ alter, force });
    await UserProfile.sync({ alter, force });
    await VerificationList.sync({ alter, force });
}
