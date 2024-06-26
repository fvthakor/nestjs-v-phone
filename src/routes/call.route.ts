import express from "express";
import { CallController } from "../controllers";
import { CheckAuth } from "../middleware";

const callRoute = express.Router();

callRoute.get('/call-token',CheckAuth,  CallController.getToken);
callRoute.post('/make-call', CallController.makeCall);
export default callRoute;
