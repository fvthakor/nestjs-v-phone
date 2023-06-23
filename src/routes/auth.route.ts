import express from "express";
import { AuthController } from "../controllers";

const authRoute = express.Router();

authRoute.post('/register', AuthController.register)
authRoute.post('/login', AuthController.login)

export default authRoute;
