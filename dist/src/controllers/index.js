"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.AuthController = void 0;
const auth_controller_1 = __importDefault(require("./auth.controller"));
exports.AuthController = auth_controller_1.default;
const User_controller_1 = __importDefault(require("./User.controller"));
exports.UserController = User_controller_1.default;
