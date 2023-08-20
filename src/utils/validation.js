import Joi from "joi";

export const userSchema = Joi.object({
    avatar: Joi.string(),
    username: Joi.string(),
    first_name: Joi.string(),
    second_name: Joi.string(),
    password:Joi.string(),
    description:Joi.string(),
});

export const channelSchema = Joi.object({
    avatar: Joi.string(),
    channel_name: Joi.string(),
    channel_link: Joi.string(),
});

export const groupSchema = Joi.object({
    avatar: Joi.string(),
    group_name: Joi.string()
});


export const messageSchema = Joi.object({
    content:Joi.string()
})

export const authScheme = Joi.object({
    avatar: Joi.string(),
    username: Joi.string(),
    first_name: Joi.string(),
    second_name: Joi.string(),
    password: Joi.string(),
})
