import { messageSchema } from "../utils/validation.js";
import { Exports } from "../model/index.js";
import multer from "multer";
import path from 'path';

const upload = multer({
    dest: 'messageUploads/',
    storage: multer.diskStorage({
        destination: 'messageUploads/',
        filename: function (req, file, cb) {
            const timestamp = Date.now();
            const extension = path.extname(file.originalname);
            cb(null, `${timestamp}${extension}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg') {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Only JPEG images are allowed'));
        }
    }
});


export const createMessage = async (req, res) => {
    try {
        const { content, channel_id, group_id } = req.body;

        const newMessage = await Exports.Message.create({
            content,
            channel_id,
            group_id,
        });

        res.status(201).json(newMessage);
    } catch (error) {
        handleInternalError(error, res);
    }
};

export const getMessages = async (req, res) => {
    try {
        const { channel_id, group_id } = req.params;

        let messages;
        if (channel_id) {
            messages = await Exports.Message.findAll({ where: { channel_id } });
        } else if (group_id) {
            messages = await Exports.Message.findAll({ where: { group_id } });
        }

        res.json(messages);
    } catch (error) {
        handleInternalError(error, res);
    }
};

export const createMessageWithUploader = async (req, res) => {
    try {
        await createMessage(req, res);
    } catch (error) {
        handleInternalError(error, res);
    }
};

export const validationMiddleware = (req, res, next) => {
    const { error } = messageSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

function handleInternalError(error, res) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}

const uploadMessage = upload.none();

export const createMessageWithUpload = async (req, res) => {
    try {
        await uploadMessage(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            await createMessage(req, res);
        });
    } catch (error) {
        handleInternalError(error, res);
    }
};
