import express from 'express';
import { validationMiddleware } from '../controllers/userController.js';
import { login, authenticateToken, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', validationMiddleware, register);

router.post('/login', login);

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route.' });
});

export default router;
