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
class ContactService extends Service_1.default {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield models_1.Setting.create(data);
                return this.response({ code: 201, message: 'Contact added successfully!', data: contact });
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
                const contact = yield models_1.Contact.findById(id);
                return contact
                    ? this.response({ code: 200, message: 'Contact by id!', data: contact })
                    : this.response({ code: 400, message: 'Contact not found!', data: null });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield models_1.Contact.find({ user: userId });
                return contact
                    ? this.response({ code: 200, message: 'Contact by user!', data: contact })
                    : this.response({ code: 400, message: 'Contact not found!', data: null });
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
                const contact = yield models_1.Contact.findByIdAndUpdate(id, data, { new: true });
                if (contact) {
                    return this.response({ code: 200, message: 'Contact updated successfully!', data: contact });
                }
                else {
                    return this.response({ code: 400, message: 'Contact not found!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
    // async getAll(){
    //     try{
    //         const settings = await Setting.find();
    //         return this.response({code: 200, message: 'All Settings', data: settings}) 
    //     }catch(error){
    //         return this.response({code: 500, message: 'Request failed due to an internal error.', data: []})
    //     }
    // }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield models_1.Contact.findByIdAndDelete(id);
                if (contact) {
                    return this.response({ code: 200, message: 'Contact deleted successfully!', data: contact });
                }
                else {
                    return this.response({ code: 400, message: 'Contact not found!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
}
exports.default = new ContactService();
