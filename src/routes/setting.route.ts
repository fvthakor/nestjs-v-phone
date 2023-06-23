import express from "express";
import { SettingController } from "../controllers";
import { CheckAuth } from "../middleware";

const settingRoute = express.Router();

settingRoute.post('/', CheckAuth, SettingController.create);
//settingRoute.get('/', SettingController.getAll);
settingRoute.get('/by-user', CheckAuth, SettingController.getByUser);
settingRoute.get('/:id', SettingController.getOne);
//settingRoute.put('/:id', SettingController.update);
//settingRoute.delete('/:id', SettingController.delete);

export default settingRoute; 