"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const userRoute = express_1.default.Router();
userRoute.post('/', controllers_1.UserController.create);
userRoute.get('/', controllers_1.UserController.getAll);
userRoute.get('/:id', controllers_1.UserController.getOne);
userRoute.put('/:id', controllers_1.UserController.update);
userRoute.delete('/:id', controllers_1.UserController.delete);
exports.default = userRoute;
