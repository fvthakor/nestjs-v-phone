import express from "express";
import { SettingController } from "../controllers";
import { CheckAuth } from "../middleware";
import { AdminAuthMiddleware } from "../middleware/AdminAuthMiddleware";

const settingRoute = express.Router();

settingRoute.post('/', AdminAuthMiddleware, SettingController.create);
//settingRoute.get('/', SettingController.getAll);
settingRoute.get('/by-user', AdminAuthMiddleware, SettingController.getByUser);
// settingRoute.get('/:id', CheckAuth, SettingController.getOne);
//settingRoute.put('/:id', SettingController.update);
//settingRoute.delete('/:id', SettingController.delete);

export default settingRoute; 