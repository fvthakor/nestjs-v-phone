"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const Service_1 = __importDefault(require("./Service"));
class AuthService extends Service_1.default {
    constructor() {
        super(...arguments);
        this.register = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.create(data);
                return this.response({ code: 200,
                    message: 'Register successfull!',
                    data: user,
                });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
        this.login = (data) => __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ email: data.email });
            if (user) {
                const checkPassword = yield bcrypt.compare(data.password, user.password);
                if (checkPassword) {
                    const userData = {
                        _id: user._id,
                        name: user.name,
                        role: user.role,
                        email: user.email
                    };
                    const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'drc');
                    return this.response({ code: 200,
                        message: 'Login successfull!.',
                        data: Object.assign(Object.assign({}, userData), { token: token }),
                    });
                }
                else {
                    return this.response({ code: 400, message: 'Email or Password is wrong!.', data: null });
                }
            }
            else {
                return this.response({ code: 400, message: 'Email or Password is wrong!.', data: null });
            }
        });
    }
}
exports.default = new AuthService();
