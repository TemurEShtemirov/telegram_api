import { Channel } from "./Channel.js";
import { Group } from "./Group.js";
import { Users } from "./User.js";
import { Subscription } from "./Subscription.js";
import { Message } from "./Message.js";

Users.belongsToMany(Channel, { through: Subscription, foreignKey: "user_id" })
Group.belongsToMany(Users, { through: Subscription, foreignKey: "group_id" })
Channel.belongsToMany(Users, { through: Subscription, foreignKey: "channel_id" })

await Users.sync({ alter: true });
await Group.sync({ alter: true });
await Channel.sync({ alter: true });



Message.belongsTo(Group)
Message.belongsTo(Channel)

export const  Exports = {Users,Group,Channel,Message}
