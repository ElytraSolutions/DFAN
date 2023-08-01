import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from './config';


class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
    declare id: CreationOptional<string>;
    declare email: string;
}

Users.init({
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
}, {
    sequelize,
});

export default Users;
