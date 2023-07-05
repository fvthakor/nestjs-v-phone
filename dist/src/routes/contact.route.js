"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const contactRoute = express_1.default.Router();
contactRoute.post('/', controllers_1.ContactController.create);
contactRoute.get('/', controllers_1.ContactController.getAll);
contactRoute.get('/:id', controllers_1.ContactController.getOne);
contactRoute.put('/:id', controllers_1.ContactController.update);
contactRoute.delete('/:id', controllers_1.ContactController.delete);
exports.default = contactRoute;
