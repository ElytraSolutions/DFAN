import {
    Association,
    CreationOptional,
    DataTypes,
    ForeignKey,
    HasOneCreateAssociationMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import sequelize from './config';
import VerificationList from './VerificationList';

class UserProfile extends Model<
    InferAttributes<UserProfile>,
    InferCreationAttributes<UserProfile, { omit: 'UserId' }>
> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare gender: string;
    declare mobile: string;
    declare currentAddress: string;
    declare permanentAddress: string;
    declare employmentStatus: string;
    declare employmentType: CreationOptional<string>;
    declare NFAMembershipNumber: CreationOptional<string>;
    declare membershipFrom: CreationOptional<string>;
    declare isLifeMember: CreationOptional<boolean>;
    declare hasRenewed: CreationOptional<boolean>;
    declare avatar: CreationOptional<string>;

    declare UserId: ForeignKey<string>;

    declare VerificationList?: NonAttribute<VerificationList>;
    declare getVerificationList: HasOneGetAssociationMixin<VerificationList>;
    declare setVerificationList: HasOneSetAssociationMixin<
        VerificationList,
        string
    >;
    declare createVerificationList: HasOneCreateAssociationMixin<VerificationList>;

    declare static associations: {
        VerificationList: Association<UserProfile, VerificationList>;
    };
}

UserProfile.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        permanentAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employmentStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employmentType: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        NFAMembershipNumber: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        membershipFrom: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        isLifeMember: {
            type: DataTypes.BOOLEAN,
            defaultValue: null,
        },
        hasRenewed: {
            type: DataTypes.BOOLEAN,
            defaultValue: null,
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    },
    {
        sequelize,
    },
);

export default UserProfile;
