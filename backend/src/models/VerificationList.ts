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
import UserProfile from './UserProfile';

class VerificationList extends Model<
    InferAttributes<VerificationList>,
    InferCreationAttributes<VerificationList>
> {
    declare id: CreationOptional<string>;
    declare status: CreationOptional<'pending' | 'approved' | 'rejected'>;
    declare message: CreationOptional<string | null>;

    declare UserProfile?: NonAttribute<UserProfile>;
    declare getUserProfile: HasOneGetAssociationMixin<UserProfile>;
    declare setUserProfile: HasOneSetAssociationMixin<UserProfile, string>;
    declare createUserProfile: HasOneCreateAssociationMixin<UserProfile>;

    declare UserProfileId: CreationOptional<ForeignKey<string>>;

    declare static associations: {
        userProfile: Association<VerificationList, UserProfile>;
    };
}

VerificationList.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            allowNull: false,
            defaultValue: 'pending',
        },
        message: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
    },
);

export default VerificationList;
