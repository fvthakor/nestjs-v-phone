"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const authRoute = express_1.default.Router();
authRoute.post('/register', controllers_1.AuthController.register);
authRoute.post('/login', controllers_1.AuthController.login);
exports.default = authRoute;
