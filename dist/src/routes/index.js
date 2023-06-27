"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const setting_route_1 = __importDefault(require("./setting.route"));
const number_route_1 = __importDefault(require("./number.route"));
const restRouter = express_1.default.Router();
exports.restRouter = restRouter;
restRouter.use('/auth', auth_route_1.default);
restRouter.use('/user', user_route_1.default);
restRouter.use('/setting', setting_route_1.default);
restRouter.use('/number', number_route_1.default);