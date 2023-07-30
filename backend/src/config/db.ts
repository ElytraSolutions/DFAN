import UserModel from '../models/User';
import RegistrationListModel from '../models/RegistrationList';

export default async function config() {
    const alter = false;
    const force = false;
    await UserModel.sync({ alter, force });
    await RegistrationListModel.sync({ alter, force });
}
