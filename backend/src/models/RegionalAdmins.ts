import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from './config';


class RegionalAdmins extends Model<InferAttributes<RegionalAdmins>, InferCreationAttributes<RegionalAdmins>> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare password: string;
    declare name: CreationOptional<string>;
}

RegionalAdmins.init({
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
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            is: /^[\S]+/,
        }
    },
}, {
    sequelize,
});

export default RegionalAdmins;
