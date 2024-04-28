"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const AdminAuthMiddleware_1 = require("../middleware/AdminAuthMiddleware");
const messageRoute = express_1.default.Router();
messageRoute.post('/receive-sms', controllers_1.MessageController.receiveMessage);
messageRoute.post('/', AdminAuthMiddleware_1.AdminAuthMiddleware, controllers_1.MessageController.sendMessage);
messageRoute.get('/number-list', AdminAuthMiddleware_1.AdminAuthMiddleware, controllers_1.MessageController.numberList);
messageRoute.post('/get-messages', AdminAuthMiddleware_1.AdminAuthMiddleware, controllers_1.MessageController.getMessages);
messageRoute.post('/read-messages', AdminAuthMiddleware_1.AdminAuthMiddleware, controllers_1.MessageController.readMessage);
messageRoute.delete('/:id', middleware_1.CheckAuth, controllers_1.MessageController.delete);
exports.default = messageRoute;
