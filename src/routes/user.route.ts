import express from "express";
import { UserController } from "../controllers";

const userRoute = express.Router();

userRoute.post('/', UserController.create);
userRoute.get('/', UserController.getAll);
userRoute.get('/:id', UserController.getOne);
userRoute.put('/:id', UserController.update);
userRoute.delete('/:id', UserController.delete);

export default userRoute;