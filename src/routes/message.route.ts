import express from "express";
import { MessageController, NumberController, SettingController } from "../controllers";
import { CheckAuth } from "../middleware";

const messageRoute = express.Router();

messageRoute.post('/receive-sms', MessageController.receiveMessage);
messageRoute.post('/', CheckAuth, MessageController.sendMessage);
messageRoute.get('/number-list', CheckAuth, MessageController.numberList);
messageRoute.post('/get-messages', CheckAuth, MessageController.getMessages);
messageRoute.delete('/:id', CheckAuth, MessageController.delete);

export default messageRoute; 