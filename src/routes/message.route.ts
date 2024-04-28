import express from "express";
import { MessageController } from "../controllers";
import { CheckAuth } from "../middleware";
import { AdminAuthMiddleware } from "../middleware/AdminAuthMiddleware";

const messageRoute = express.Router();

messageRoute.post('/receive-sms', MessageController.receiveMessage);
messageRoute.post('/', AdminAuthMiddleware, MessageController.sendMessage);
messageRoute.get('/number-list', AdminAuthMiddleware, MessageController.numberList);
messageRoute.post('/get-messages', AdminAuthMiddleware, MessageController.getMessages);
messageRoute.post('/read-messages', AdminAuthMiddleware, MessageController.readMessage);
messageRoute.delete('/:id', CheckAuth, MessageController.delete);

export default messageRoute; 