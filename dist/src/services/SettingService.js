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
const TwilioHelper_1 = __importDefault(require("../helpers/TwilioHelper"));
class SettingService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkSetting = yield models_1.Setting.findOne({ user: data.user });
                const numberAdd = yield TwilioHelper_1.default.addNumberToAccount(data.number, data.sid, data.token);
                if (numberAdd) {
                    const twiml_app = yield TwilioHelper_1.default.creatTwiml(data.sid, data.token);
                    if (twiml_app) {
                        data.twiml_app = twiml_app;
                        const appData = yield TwilioHelper_1.default.creatAPIKey(data.sid, data.token);
                        if (appData) {
                            data.app_key = appData.sid;
                            data.app_secret = appData.secret;
                        }
                        else {
                            return this.response({ code: 400, message: 'Something was wrong!', data: null });
                        }
                    }
                    else {
                        return this.response({ code: 400, message: 'Something was wrong!', data: null });
                    }
                }
                else {
                    return this.response({ code: 400, message: 'Something was wrong!', data: null });
                }
                const sid = yield commonHelper_1.default.encryptedString(data.sid);
                const token = yield commonHelper_1.default.encryptedString(data.token);
                let setting;
                const updateData = Object.assign(Object.assign({}, data), { sid, token });
                if (checkSetting) {
                    if (checkSetting.app_key) {
                        yield TwilioHelper_1.default.removeAPIKey(checkSetting.sid, checkSetting.token, checkSetting.app_key);
                    }
                    if (checkSetting.twiml_app) {
                        yield TwilioHelper_1.default.deleteTwiml(checkSetting.sid, checkSetting.token, checkSetting.twiml_app);
                    }
                    setting = yield models_1.Setting.findOneAndUpdate({ user: data.user }, updateData, { new: true });
                }
                else {
                    setting = yield models_1.Setting.create(updateData);
                }
                return this.response({ code: 201, message: 'Setting added successfully!', data: Object.assign({}, setting === null || setting === void 0 ? void 0 : setting.toJSON()) });
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
                console.log(setting ? yield commonHelper_1.default.decryptedString(setting.sid) : '');
                console.log(setting ? commonHelper_1.default.decryptedString(setting.token) : '');
                return setting
                    ? this.response({ code: 200, message: 'Setting by user!', data: Object.assign({}, setting.toJSON()) })
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
