import { groupSchema } from '../utils/validation.js';
import { Exports } from '../model/index.js';
import paginate from '../utils/pagination.js';
import multer from 'multer';
import path from 'path';

const upload = multer({
    dest: 'Group_uploads/',
    storage: multer.diskStorage({
        destination: 'Group_uploads/',
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


export const getGroups = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const groups = await Exports.Group.findAll(paginate({}, { page, pageSize }));
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// export const createGroup = async (req, res) => {
//     try {
//         const newGroup = await Exports.Group.create({
//             ...req.body,
//             avatar: req.file.filename,
//         });

//         res.status(201).json(newGroup);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// export const createGroupWithUpload = (req, res) => {
//     upload.single('avatar')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ error: err.message });
//         }
//         createGroup(req, res);
//     });
// };


export const createGroup = async (req, res) => {
    try {
        const { error } = groupSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const newGroupData = {
            ...req.body,
            avatar: req.file.filename,
        };

        const newGroup = await Exports.Group.create(newGroupData);

        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createGroupWithUpload = (req, res) => {
    upload.single('avatar')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        createGroup(req, res);
    });
};


export const validationMiddleware = (req, res, next) => {
    const { error } = groupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

