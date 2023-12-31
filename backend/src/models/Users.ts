import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    HasOneCreateAssociationMixin,
    NonAttribute,
    Association,
} from 'sequelize';
import sequelize from './config';
import UserProfile from './UserProfile';
import States from '../../public/data/States.json';

class Users extends Model<
    InferAttributes<Users, { omit: 'UserProfile' }>,
    InferCreationAttributes<Users, { omit: 'UserProfile' }>
> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare password: string;
    declare role: CreationOptional<'User' | 'Central Admin' | 'Regional Admin'>;
    declare region: CreationOptional<keyof typeof States | null>;

    declare UserProfile?: NonAttribute<UserProfile>;
    declare getUserProfile: HasOneGetAssociationMixin<UserProfile>;
    declare setUserProfile: HasOneSetAssociationMixin<UserProfile, string>;
    declare createUserProfile: HasOneCreateAssociationMixin<UserProfile>;

    declare static associations: {
        UserProfile: Association<Users, UserProfile>;
    };
}

Users.init(
    {
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
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('User', 'Central Admin', 'Regional Admin'),
            allowNull: false,
            defaultValue: 'User',
        },
        region: {
            type: DataTypes.ENUM(...States),
            allowNull: true,
        },
    },
    {
        sequelize,
    },
);

export default Users;
