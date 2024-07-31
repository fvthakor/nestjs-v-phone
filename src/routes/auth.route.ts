import express from "express";
import { AuthController, UserController } from "../controllers";
import { AdminAuthMiddleware } from "../middleware/AdminAuthMiddleware";
import { CheckAuth } from "../middleware";

const authRoute = express.Router();

authRoute.post('/register', AuthController.register)
authRoute.post('/login', AuthController.login);
authRoute.get('/logout', AuthController.logout);
authRoute.post('/super-admin/login', AuthController.superAdminlogin);
authRoute.post('/admin/login', AuthController.adminlogin);
authRoute.get('/admin/me',AdminAuthMiddleware, UserController.me);
authRoute.post('/admin/profile-update',AdminAuthMiddleware, UserController.profileUpdate);
authRoute.get('/super-admin/me',CheckAuth, UserController.me);

export default authRoute;
