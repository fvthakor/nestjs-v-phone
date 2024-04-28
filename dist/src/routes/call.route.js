"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const callRoute = express_1.default.Router();
callRoute.get('/call-token', middleware_1.CheckAuth, controllers_1.CallController.getToken);
callRoute.post('/make-call', controllers_1.CallController.makeCall);
exports.default = callRoute;
