import express from 'express'
import { validationMiddleware,getChannels,createChannelWithUpload } from '../controllers/channelController.js';

const router = express.Router();
router.get('/channels', getChannels);
router.post('/channels',validationMiddleware,createChannelWithUpload);

export default router
