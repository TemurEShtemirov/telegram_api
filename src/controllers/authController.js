import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";
import "dotenv/config";
import { Exports } from "../model/index.js";
import multer from "multer";
import { authScheme } from "../utils/validation.js";
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
const secret_key = process.env.SECRET_KEY;

export const register = async (req, res) => {
  try {
    upload.single("avatar")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { avatar, username, first_name, second_name, password } = req.body;

      const existingUser = await Exports.Users.findOne({ where: { username } });

      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 15);
      const newUser = await Exports.Users.create({
        avatar: req.file ? req.file.filename : null,
        username,
        first_name,
        second_name,
        password: hashedPassword,
      });

      return res.status(201).json(newUser);
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Exports.Users.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password, user.username);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({ username });
    res.json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secret_key, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

export const validationMiddleware = (req, res, next) => {
  const { error } = authScheme.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};
