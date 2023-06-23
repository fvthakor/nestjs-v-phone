"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const settingRoute = express_1.default.Router();
settingRoute.post('/', middleware_1.CheckAuth, controllers_1.SettingController.create);
//settingRoute.get('/', SettingController.getAll);
settingRoute.get('/by-user', middleware_1.CheckAuth, controllers_1.SettingController.getByUser);
settingRoute.get('/:id', controllers_1.SettingController.getOne);
//settingRoute.put('/:id', SettingController.update);
//settingRoute.delete('/:id', SettingController.delete);
exports.default = settingRoute;
