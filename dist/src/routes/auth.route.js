"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const AdminAuthMiddleware_1 = require("../middleware/AdminAuthMiddleware");
const middleware_1 = require("../middleware");
const authRoute = express_1.default.Router();
authRoute.post('/register', controllers_1.AuthController.register);
authRoute.post('/login', controllers_1.AuthController.login);
authRoute.get('/logout', controllers_1.AuthController.logout);
authRoute.post('/super-admin/login', controllers_1.AuthController.superAdminlogin);
authRoute.post('/admin/login', controllers_1.AuthController.adminlogin);
authRoute.get('/admin/me', AdminAuthMiddleware_1.AdminAuthMiddleware, controllers_1.UserController.me);
authRoute.post('/admin/profile-update', AdminAuthMiddleware_1.AdminAuthMiddleware, controllers_1.UserController.profileUpdate);
authRoute.get('/super-admin/me', middleware_1.CheckAuth, controllers_1.UserController.me);
exports.default = authRoute;
