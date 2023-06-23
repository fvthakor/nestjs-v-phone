import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import settingRoute from "./setting.route";

const restRouter = express.Router();

restRouter.use('/auth', authRoute)
restRouter.use('/user', userRoute)
restRouter.use('/setting', settingRoute);

export{ restRouter };
