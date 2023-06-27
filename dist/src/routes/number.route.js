"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const numberRoute = express_1.default.Router();
numberRoute.post('/get-number', middleware_1.CheckAuth, controllers_1.NumberController.getNumbers);
numberRoute.post('/', middleware_1.CheckAuth, controllers_1.NumberController.purchaseNumbers);
numberRoute.get('/', middleware_1.CheckAuth, controllers_1.NumberController.getAll);
numberRoute.get('/:id', middleware_1.CheckAuth, controllers_1.NumberController.getOne);
exports.default = numberRoute;
