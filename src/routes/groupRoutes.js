import express from 'express';
import {getGroups,validationMiddleware,createGroupWithUpload} from '../controllers/groupController.js';

const router = express.Router();

router.get('/groups', getGroups);
router.post('/groups', validationMiddleware, createGroupWithUpload);

export default router;
