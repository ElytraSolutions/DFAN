import {
    Association,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from './config';
import UserProfile from './UserProfile';

class UpdateRequest extends Model<
    InferAttributes<UpdateRequest>,
    InferCreationAttributes<UpdateRequest>
> {
    declare id: CreationOptional<string>;
    declare field: string;
    declare oldValue: string;
    declare newValue: string;

    declare UserProfileId: CreationOptional<ForeignKey<string>>;

    declare static associations: {
        UpdateRequests: Association<UpdateRequest, UserProfile>;
    };
}

UpdateRequest.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        field: {
            type: DataTypes.STRING,
        },
        oldValue: {
            type: DataTypes.STRING,
        },
        newValue: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'UpdateRequest',
    },
);

export default UpdateRequest;
