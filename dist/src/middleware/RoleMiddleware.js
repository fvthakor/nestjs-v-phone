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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const checkRole = function (module, type) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers["authorization"];
            if (!authHeader)
                return res.status(401).json({ code: 401, message: 'Please provide auth token!', data: null });
            const accessToken = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'drc';
            const decoded = yield jwt.verify(authHeader, accessToken);
            if (decoded) {
                if (typeof decoded !== 'string') {
                    const checkRole = true;
                    if (checkRole) {
                        req.userId = decoded.id;
                        //req.roleId = decoded.RoleId;
                        return next();
                    }
                    else {
                        return res.status(401).json({
                            code: 401,
                            message: `No permission to ${type} ${module}`,
                            data: null
                        });
                    }
                }
                else {
                    return res.status(401).json({
                        code: 401,
                        message: 'Unauthorize access!',
                        data: null
                    });
                }
            }
            else {
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorize access!',
                    data: null
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                code: 500,
                message: 'Request failed due to an internal error!',
                data: null
            });
        }
    });
};
exports.checkRole = checkRole;
