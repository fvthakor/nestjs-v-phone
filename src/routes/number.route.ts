import express from "express";
import { NumberController, SettingController } from "../controllers";
import { CheckAuth } from "../middleware";

const numberRoute = express.Router();

numberRoute.post('/get-number',CheckAuth, NumberController.getNumbers);
numberRoute.post('/', CheckAuth, NumberController.purchaseNumbers);
numberRoute.get('/', CheckAuth, NumberController.getAll);
numberRoute.get('/:id', CheckAuth, NumberController.getOne);

export default numberRoute; 