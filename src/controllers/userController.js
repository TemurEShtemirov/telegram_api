import { userSchema } from '../utils/validation.js';
import { Exports } from "../model/index.js";
import paginate from '../utils/pagination.js';
import multer from 'multer';
import path from 'path';

const upload = multer({
    dest: 'uploads/',
    storage: multer.diskStorage({
        destination: 'uploads/',
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


export const getUsers = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const users = await Exports.Users.findAll(paginate({}, { page, pageSize }));
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// export const createUser = async (req, res) => {
//     try {
//         const { error } = userSchema.validate(req.body);

//         if (error) {
//             return res.status(400).json({ error: error.message });
//         }

//         const { avatar, ...userData } = req.body;
//         userData.avatar = req.file.filename;

//         const newUser = await Exports.Users.create(userData);

//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


export const createUser = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { avatar, username, first_name, second_name,  password } = req.body;
        const userData = {
            avatar: req.file.filename,
            username,
            first_name,
            second_name,
            password
        };

        console.log('userData:', userData);

        const newUser = await Exports.Users.create(userData);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createUserWithUpload = (req, res) => {
    upload.single('avatar')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        createUser(req, res);
    });
};

export const validationMiddleware = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    next();
};
