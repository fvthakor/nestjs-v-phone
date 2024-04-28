"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const AdminAuthMiddleware_1 = require("../middleware/AdminAuthMiddleware");
const settingRoute = express_1.default.Router();
settingRoute.post('/', AdminAuthMiddleware_1.AdminAuthMiddleware, controllers_1.SettingController.create);
//settingRoute.get('/', SettingController.getAll);
settingRoute.get('/by-user', AdminAuthMiddleware_1.AdminAuthMiddleware, controllers_1.SettingController.getByUser);
// settingRoute.get('/:id', CheckAuth, SettingController.getOne);
//settingRoute.put('/:id', SettingController.update);
//settingRoute.delete('/:id', SettingController.delete);
exports.default = settingRoute;
