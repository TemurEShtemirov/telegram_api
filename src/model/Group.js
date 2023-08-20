import { DataTypes, Model, } from "sequelize";
import sequelize from "../config/database.js";

export class Group extends Model { }

Group.init({
    group_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    avatar: {
        type: DataTypes.STRING,
    },
    group_name: {
        type: DataTypes.STRING,
        // allowNull: false,
        // unique: true,
    },

}, {

    tableName: "group",
    timestamps: true,
    sequelize: sequelize
});