import {
    Association,
    CreationOptional,
    DataTypes,
    ForeignKey,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManySetAssociationsMixin,
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
import UpdateRequest from './UpdateRequest';

class UserProfile extends Model<
    InferAttributes<UserProfile>,
    InferCreationAttributes<UserProfile, { omit: 'UserId' }>
> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare gender: CreationOptional<string | null>;
    declare mobile: CreationOptional<string | null>;
    declare currentAddress: CreationOptional<string | null>;
    declare permanentAddress: CreationOptional<string | null>;
    declare employmentStatus: CreationOptional<string | null>;
    declare employmentType: CreationOptional<string | null>;
    declare NFAMembershipNumber: CreationOptional<string>;
    declare membershipFrom: CreationOptional<string | null>;
    declare isLifeMember: CreationOptional<boolean | null>;
    declare hasRenewed: CreationOptional<boolean | null>;
    declare avatar: string;

    declare UserId: ForeignKey<string>;

    declare VerificationList?: NonAttribute<VerificationList>;
    declare getVerificationList: HasOneGetAssociationMixin<VerificationList>;
    declare setVerificationList: HasOneSetAssociationMixin<
        VerificationList,
        string
    >;
    declare createVerificationList: HasOneCreateAssociationMixin<VerificationList>;

    declare UpdateRequests?: NonAttribute<UpdateRequest>;
    declare getUpdateRequests: HasManyGetAssociationsMixin<UpdateRequest>;
    declare countUpdateRequests: HasManyCountAssociationsMixin;
    declare hasUpdateRequest: HasManyHasAssociationMixin<UpdateRequest, string>;
    declare hasUpdateRequests: HasManyHasAssociationsMixin<
        UpdateRequest,
        string
    >;
    declare setUpdateRequests: HasManySetAssociationsMixin<
        UpdateRequest,
        string
    >;
    declare addUpdateRequest: HasManyAddAssociationMixin<UpdateRequest, string>;
    declare addUpdateRequests: HasManyAddAssociationsMixin<
        UpdateRequest,
        string
    >;
    declare createUpdateRequest: HasManyCreateAssociationMixin<UpdateRequest>;

    declare static associations: {
        VerificationList: Association<UserProfile, VerificationList>;
        UpdateRequests: Association<UserProfile, UpdateRequest>;
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
            allowNull: true,
            defaultValue: null,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        currentAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        permanentAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        employmentStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
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
