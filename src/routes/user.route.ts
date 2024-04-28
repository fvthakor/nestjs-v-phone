import express from "express";
import { UserController } from "../controllers";
import { AdminAuthMiddleware } from "../middleware/AdminAuthMiddleware";

const userRoute = express.Router();

userRoute.post('/', UserController.create);
userRoute.get('/', UserController.getAll);
userRoute.get('/:id', UserController.getOne);
userRoute.put('/:id', UserController.update);
userRoute.delete('/:id', UserController.delete);


export default userRoute;