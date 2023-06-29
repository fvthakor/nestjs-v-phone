"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class MessageController {
    constructor() {
        this.sendMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.MessageService.sendMessage(Object.assign(Object.assign({}, req.body), { user: req.userId ? req.userId : '' }));
            return res.status(response.code).json(response);
        });
        this.receiveMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.MessageService.receiveMessage(req);
            console.log(response.toString());
            res.set('Content-Type', 'text/xml');
            res.send(response.toString());
        });
        this.getMessages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.MessageService.getMessages(req.body.number, req.userId ? req.userId : '');
            return res.status(response.code).json(response);
        });
        this.numberList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.MessageService.numberList(req);
            return res.status(response.code).json(response);
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.MessageService.getAll(req);
            return res.status(response.code).json(response);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.MessageService.delete(req.params.id);
            return res.status(response.code).json(response);
        });
    }
}
exports.default = new MessageController();
