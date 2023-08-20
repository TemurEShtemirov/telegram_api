import express from 'express'
const router = express.Router();
import {createUserWithUpload,getUsers,validationMiddleware} from '../controllers/userController.js'

router.get('/users', getUsers);
router.post('/users', validationMiddleware,createUserWithUpload);

export default router;
