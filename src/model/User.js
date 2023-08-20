import { DataTypes, Model, } from "sequelize";
import sequelize from '../config/database.js'
export class Users extends Model { }
Users.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    avatar: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
       
    },
    first_name: {
        type: DataTypes.STRING,
    },
    second_name: {
        type: DataTypes.STRING,
    },
    password:{
        type :DataTypes.STRING ,

    }

}, {

    tableName: "user",
    timestamps: true,
    sequelize: sequelize
});