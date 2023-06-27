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
class NumberController {
    constructor() {
        this.getNumbers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.NumberService.getNumbers(req.body);
            return res.status(response.code).json(response);
        });
        this.purchaseNumbers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.NumberService.purchaseNumbers(req.body.phoneNumbers, req.userId ? req.userId : '');
            // return res.status(response.code).json(response);
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.NumberService.getOne(req.params.id);
            return res.status(response.code).json(response);
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.NumberService.getAll(req);
            return res.status(response.code).json(response);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.NumberService.delete(+req.params.id);
            return res.status(response.code).json(response);
        });
    }
}
exports.default = new NumberController();
