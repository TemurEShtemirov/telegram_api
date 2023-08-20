import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import { Group } from './Group.js';
import { Channel } from './Channel.js';
export class Message extends Model { }

Message.init(
    {
        message_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
        },
        channel_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Channel,
                key: "id"
            }
        },
        group_id: {
            type: DataTypes.INTEGER,
           references:{
            model:Group,
            key:"id"
           }
        },
    },
    {
        tableName: 'message',
        timestamps: true,
        sequelize: sequelize,
    }
);
