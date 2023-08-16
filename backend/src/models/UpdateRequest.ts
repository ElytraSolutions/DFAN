import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from './config';

class UpdateRequest extends Model<
    InferAttributes<UpdateRequest>,
    InferCreationAttributes<UpdateRequest>
> {
    declare field: string;
    declare oldValue: string;
    declare newValue: string;
}

UpdateRequest.init(
    {
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
