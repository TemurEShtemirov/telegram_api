import { channelSchema } from '../utils/validation.js';
import { Exports } from '../model/index.js';
import paginate from '../utils/pagination.js';
import multer from 'multer';
import path from 'path';

const upload = multer({
    dest: 'Chhanels_uploads/',
    storage: multer.diskStorage({
        destination: 'Chhanels_uploads/',
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



export const getChannels = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const channels = await Exports.Channel.findAll(paginate({}, { page, pageSize }));
        res.json(channels);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createChannel = async (req, res) => {
    try {
        const { error } = channelSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const newChannel = await Exports.Channel.create({
            ...req.body,
            avatar: req.file.filename
        });

        res.status(201).json(newChannel);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createChannelWithUpload = (req, res) => {
    upload.single('avatar')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        createChannel(req, res);
    });
};

export const validationMiddleware = (req, res, next) => {
    const { error } = channelSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Export the functions as an object (alternative to using default export)
// export const channelController = {
//     getChannels,
//     createChannel,
//     createChannelWithUpload,
//     validationMiddleware,
// };
