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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const Service_1 = __importDefault(require("./Service"));
class PlanService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('data', data);
                // const hash = await bcrypt.hash(data.password, process.env.PASSWORD_SALT ? +process.env.PASSWORD_SALT : 10);
                const user = yield models_1.Plan.create(Object.assign({}, data));
                return this.response({ code: 201, message: 'Plan added successfully!', data: user });
            }
            catch (error) {
                console.log(error);
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.Plan.findById(id);
                return user
                    ? this.response({ code: 200, message: 'Plan by id!', data: user })
                    : this.response({ code: 400, message: 'Plan not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.Plan.findByIdAndUpdate(id, data, { new: true });
                if (user) {
                    return this.response({ code: 200, message: 'Plan updated successfully!', data: user });
                }
                else {
                    return this.response({ code: 400, message: 'Plan not found!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.Plan.find();
                return this.response({ code: 200, message: 'All Plans', data: users });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: [] });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id);
                const user = yield models_1.Plan.findByIdAndDelete(id);
                if (user) {
                    return this.response({ code: 200, message: 'Plan deleted successfully!', data: user });
                }
                else {
                    return this.response({ code: 400, message: 'Plan not found!', data: null });
                }
            }
            catch (error) {
                console.log(error);
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
}
exports.default = new PlanService();
