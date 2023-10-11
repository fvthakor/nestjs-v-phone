import express from "express";
import { AuthController } from "../controllers";

const authRoute = express.Router();

authRoute.post('/register', AuthController.register)
authRoute.post('/login', AuthController.login);
authRoute.get('/logout', AuthController.logout)

export default authRoute;
