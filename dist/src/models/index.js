"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.Contact = exports.Message = exports.Number = exports.Setting = exports.User = void 0;
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const setting_model_1 = __importDefault(require("./setting.model"));
exports.Setting = setting_model_1.default;
const number_model_1 = __importDefault(require("./number.model"));
exports.Number = number_model_1.default;
const Message_model_1 = __importDefault(require("./Message.model"));
exports.Message = Message_model_1.default;
const contact_model_1 = __importDefault(require("./contact.model"));
exports.Contact = contact_model_1.default;
const chat_model_1 = __importDefault(require("./chat.model"));
exports.Chat = chat_model_1.default;
