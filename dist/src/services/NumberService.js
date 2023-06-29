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
const helpers_1 = require("../helpers");
class NumberService extends Service_1.default {
    constructor() {
        super(...arguments);
        this.getNumbers = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const numbers = yield helpers_1.TwilioHelper.getPhoneNumbers(data);
                return this.response({ code: 200, message: 'Number added successfully!', data: numbers });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
        this.purchaseNumbers = (numbers, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const numbersData = [];
                // const number = []
                for (let number of numbers) {
                    //const purchasedNumber = await TwilioHelper.purchaseNumber(number);
                    const purchasedNumber = {
                        sid: `ABABABABABAABBABB-${new Date().getTime()}`
                    };
                    numbersData.push({
                        user: userId,
                        sid: purchasedNumber.sid,
                        number
                    });
                }
                if (numbersData.length > 0) {
                    yield models_1.Number.create(numbersData);
                    const insertednumber = yield models_1.Number.find({ number: { $in: numbers } });
                    return this.response({ code: 201, message: 'Number purchased successfully!', data: insertednumber });
                }
                else {
                    return this.response({ code: 400, message: 'Number not purchased!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const number = yield models_1.Number.findById(id);
                return number
                    ? this.response({ code: 200, message: 'Number by id!', data: number })
                    : this.response({ code: 400, message: 'Number not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.userId);
                const numbers = yield models_1.Number.find({ user: req.userId });
                return this.response({ code: 200, message: 'All Numbers', data: numbers });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: [] });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const number = yield models_1.Number.findById(id);
                // await TwilioHelper.deleteNumber(setting?.sid ? setting.sid : '');
                if (number) {
                    yield number.deleteOne();
                    return this.response({ code: 200, message: 'Number deleted successfully!', data: number });
                }
                else {
                    return this.response({ code: 400, message: 'Number not found!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
}
exports.default = new NumberService();
