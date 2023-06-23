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
const commonHelper_1 = __importDefault(require("../helpers/commonHelper"));
class SettingService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkSetting = yield models_1.Setting.findOne({ user: data.user });
                const sid = yield commonHelper_1.default.encryptedString(data.sid);
                const token = yield commonHelper_1.default.encryptedString(data.token);
                console.log('sid', sid);
                let setting;
                const updateData = Object.assign(Object.assign({}, data), { sid, token });
                if (checkSetting) {
                    setting = yield models_1.Setting.findOneAndUpdate({ user: data.user }, updateData, { new: true });
                }
                else {
                    setting = yield models_1.Setting.create(updateData);
                }
                return this.response({ code: 201, message: 'Setting added successfully!', data: setting });
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
                const setting = yield models_1.Setting.findById(id);
                return setting
                    ? this.response({ code: 200, message: 'Setting by id!', data: setting })
                    : this.response({ code: 400, message: 'Setting not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    getByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setting = yield models_1.Setting.findOne({ user: userId });
                return setting
                    ? this.response({ code: 200, message: 'Setting by user!', data: Object.assign(Object.assign({}, setting.toJSON()), { token: commonHelper_1.default.decryptedString(setting.token), sid: commonHelper_1.default.decryptedString(setting.sid) }) })
                    : this.response({ code: 400, message: 'Setting not found!', data: null });
            }
            catch (error) {
                console.log(error);
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setting = yield models_1.Setting.findByIdAndUpdate(id, data, { new: true });
                if (setting) {
                    return this.response({ code: 200, message: 'Setting updated successfully!', data: setting });
                }
                else {
                    return this.response({ code: 400, message: 'Setting not found!', data: null });
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
                const settings = yield models_1.Setting.find();
                return this.response({ code: 200, message: 'All Settings', data: settings });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: [] });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setting = yield models_1.Setting.findByIdAndDelete(id);
                if (setting) {
                    return this.response({ code: 200, message: 'Setting deleted successfully!', data: setting });
                }
                else {
                    return this.response({ code: 400, message: 'Setting not found!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
}
exports.default = new SettingService();
