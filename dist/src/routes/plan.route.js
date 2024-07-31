"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const planRoute = express_1.default.Router();
planRoute.post('/', middleware_1.CheckAuth, controllers_1.PlanController.create);
planRoute.get('/', middleware_1.CheckAuth, controllers_1.PlanController.getAll);
planRoute.get('/:id', middleware_1.CheckAuth, controllers_1.PlanController.getOne);
planRoute.put('/:id', middleware_1.CheckAuth, controllers_1.PlanController.update);
planRoute.delete('/:id', middleware_1.CheckAuth, controllers_1.PlanController.delete);
exports.default = planRoute;
