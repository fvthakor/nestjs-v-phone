import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";

const restRouter = express.Router();

restRouter.use('/auth', authRoute)
restRouter.use('/user', userRoute)
export{ restRouter };
