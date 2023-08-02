import {
    Association,
    CreationOptional,
    DataTypes,
    HasOneCreateAssociationMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import sequelize from './config';
import UserProfile from './UserProfile';
import Users from './Users';

class RegionalAdmins extends Model<
    InferAttributes<RegionalAdmins>,
    InferCreationAttributes<RegionalAdmins>
> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare password: string;
    declare name: CreationOptional<string>;

    declare UserProfile?: NonAttribute<UserProfile>;
    declare getUserProfile: HasOneGetAssociationMixin<UserProfile>;
    declare setUserProfile: HasOneSetAssociationMixin<UserProfile, string>;
    declare createUserProfile: HasOneCreateAssociationMixin<UserProfile>;

    declare static associations: {
        userProfile: Association<Users, UserProfile>;
    };
}

RegionalAdmins.init(
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
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                is: /^[\S]+/,
            },
        },
    },
    {
        sequelize,
    },
);

export default RegionalAdmins;
