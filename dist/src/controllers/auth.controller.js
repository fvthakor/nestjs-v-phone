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
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.AuthService.login(req.body, res);
            return res.status(response.code).json(response);
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.AuthService.register(req.body);
            return res.status(response.code).json(response);
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.AuthService.logout(req.userId ? req.userId : '', res);
            return res.status(response.code).json(response);
        });
        this.superAdminlogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.AuthService.superAdminlogin(req.body, res, 'super-admin');
            return res.status(response.code).json(response);
        });
        this.adminlogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.AuthService.superAdminlogin(req.body, res, 'admin');
            return res.status(response.code).json(response);
        });
    }
}
exports.default = new AuthController();
