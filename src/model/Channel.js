import { DataTypes, Model, } from "sequelize";
import sequelize from "../config/database.js";

export class Channel extends Model { }

Channel.init({
    channel_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    avatar: {
        type: DataTypes.STRING,
    },
    channel_name: {
        type: DataTypes.STRING,
      
    },
    channel_link: {
        type: DataTypes.STRING,
    },

}, {

    tableName: "channel",
    timestamps: true,
    sequelize: sequelize
});

