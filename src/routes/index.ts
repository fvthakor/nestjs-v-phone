import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import settingRoute from "./setting.route";
import numberRoute from "./number.route";
import messageRoute from "./message.route";
import contactRoute from "./contact.route";

const restRouter = express.Router();

restRouter.use('/auth', authRoute)
restRouter.use('/user', userRoute)
restRouter.use('/setting', settingRoute);
restRouter.use('/number', numberRoute);
restRouter.use('/message', messageRoute);
restRouter.use('/contact', contactRoute);

export{ restRouter };
