import { Association, CreationOptional, DataTypes, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import sequelize from './config';
import UserProfile from './UserProfile';


class VerificationList extends Model<InferAttributes<VerificationList>, InferCreationAttributes<VerificationList>> {
    declare id: CreationOptional<string>;
    declare status: CreationOptional<"pending" | "approved" | "rejected">;

    declare UserProfile?: NonAttribute<UserProfile>;
    declare getUserProfile: HasOneGetAssociationMixin<UserProfile>;
    declare setUserProfile: HasOneSetAssociationMixin<UserProfile, string>;
    declare createUserProfile: HasOneCreateAssociationMixin<UserProfile>;

    declare static associations: {
        userProfile: Association<VerificationList, UserProfile>;
    };
}

VerificationList.init({
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
    },
}, {
    sequelize,
});


export default VerificationList;
