import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from './config';

class RegistrationList extends Model<
    InferAttributes<RegistrationList>,
    InferCreationAttributes<RegistrationList>
> {
    declare email: string;
    declare code: string;
}

RegistrationList.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'RegistrationList',
    },
);

export default RegistrationList;
