import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, HasOneGetAssociationMixin, HasOneSetAssociationMixin, HasOneCreateAssociationMixin, NonAttribute, Association } from 'sequelize';
import sequelize from './config';
import UserProfile from './UserProfile';

class Users extends Model<InferAttributes<Users, { omit: 'UserProfile'; }>, InferCreationAttributes<Users, { omit: 'UserProfile'; }>> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare password: string;

    declare UserProfile?: NonAttribute<UserProfile>;
    declare getUserProfile: HasOneGetAssociationMixin<UserProfile>;
    declare setUserProfile: HasOneSetAssociationMixin<UserProfile, string>;
    declare createUserProfile: HasOneCreateAssociationMixin<UserProfile>;

    declare static associations: {
        userProfile: Association<Users, UserProfile>;
    };
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
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
});

export default Users;
