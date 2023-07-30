import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import sequelize from './config';


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare password: string;
    declare admin: CreationOptional<boolean>;
    declare name: CreationOptional<string>;
    declare gender: CreationOptional<string>;
    declare mobile: CreationOptional<number>;
    declare currentAddress: CreationOptional<string>;
    declare permanentAddress: CreationOptional<string>;
    declare membershipFrom: CreationOptional<string>;
    declare employmentStatus: CreationOptional<string>;
    declare employmentType: CreationOptional<string>;
    declare NFAMembershipNumber: CreationOptional<string>;
    declare isLifeMember: CreationOptional<boolean>;
    declare hasRenewed: CreationOptional<boolean>;
    declare hasInitailized: CreationOptional<boolean>;
}

User.init({
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
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    mobile: {
        type: DataTypes.INTEGER,
    },
    currentAddress: {
        type: DataTypes.STRING,
    },
    permanentAddress: {
        type: DataTypes.STRING,
    },
    membershipFrom: {
        type: DataTypes.STRING,
    },
    employmentStatus: {
        type: DataTypes.STRING,
    },
    employmentType: {
        type: DataTypes.STRING,
    },
    NFAMembershipNumber: {
        type: DataTypes.STRING,
    },
    isLifeMember: {
        type: DataTypes.BOOLEAN,
    },
    hasRenewed: {
        type: DataTypes.BOOLEAN,
    },
    hasInitailized: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'User',
});

export default User;
