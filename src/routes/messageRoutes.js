import express from 'express';
import { validationMiddleware, createMessage, getMessages, createMessageWithUpload } from '../controllers/messageControllers.js';

const messageRouter = express.Router();

messageRouter.post('/', validationMiddleware, createMessage);
messageRouter.post('/upload', createMessageWithUpload);
messageRouter.get('/:id/channelId?/:id/groupId?', getMessages);

export default messageRouter;
