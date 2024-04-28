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
const twilio_1 = __importDefault(require("twilio"));
const mongoose_1 = __importDefault(require("mongoose"));
class MessageService extends Service_1.default {
    constructor() {
        super(...arguments);
        this.sendMessage = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const setting = yield models_1.Setting.findOne({ user: data.user });
                if (setting) {
                    // const chatInbox = await Chat.findOne({
                    //     number: data.number,
                    //     twilioNumber: data.twilioNumber,
                    // })
                    let chatId = null;
                    // if(chatInbox){
                    //     chatId = chatInbox._id;
                    // }else{
                    //     const chatInbox = await Chat.create({
                    //         user: data.user,
                    //         number: data.number,
                    //         twilioNumber: data.twilioNumber,
                    //     })
                    //     chatId = chatInbox._id;
                    // }
                    const sendMessage = process.env.MODE === 'developer' ? { sid: 'TEST-54654564665464-fsdffs' } : yield helpers_1.TwilioHelper.sendMessage(data, setting.sid, setting.token);
                    const messageData = Object.assign(Object.assign({}, data), { sid: sendMessage.sid, type: 'send', isview: true, chatId: chatId });
                    const message = yield models_1.Message.create(messageData);
                    return this.response({ code: 200, message: 'Message send successfully!', data: message });
                }
                else {
                    return this.response({ code: 400, message: 'Setting not found! Please add first setting!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
        this.receiveMessage = (req) => __awaiter(this, void 0, void 0, function* () {
            const VoiceResponse = twilio_1.default.twiml.VoiceResponse;
            const response = new VoiceResponse();
            try {
                const { Body, To, From, SmsSid } = req.body;
                models_1.Setting.findOne({ number: To }).then((number) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (number) {
                        // const chatInbox = await Chat.findOne({
                        //     number: From,
                        //     twilioNumber: To,
                        // })
                        let chatId = null;
                        // if(chatInbox){
                        //     chatId = chatInbox._id;
                        // }else{
                        //     const chatInbox = await Chat.create({
                        //         user: number.user,
                        //         number: From,
                        //         twilioNumber: To,
                        //     })
                        //     chatId = chatInbox._id;
                        // }
                        const messageData = {
                            message: Body,
                            sid: SmsSid,
                            type: 'receive',
                            user: number.user,
                            number: From,
                            twilioNumber: To,
                            isview: false,
                            chatId: chatId
                        };
                        const message = yield models_1.Message.create(messageData);
                        // req.io?.to(`${number.user}`).emit('receiveMessage',message);
                        (_a = req.io) === null || _a === void 0 ? void 0 : _a.to(`${number.user}`).emit("message", {
                            type: 'receiveMessage',
                            data: message,
                        });
                    }
                }));
            }
            catch (error) {
                console.log(error.message);
                //return this.response({code: 500, message: error.message, data: null})
            }
            return response;
        });
        this.numberList = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = new mongoose_1.default.Types.ObjectId(req.userId);
                const messages = yield models_1.Message.aggregate([
                    { $match: { user: user_id } },
                    { $sort: { _id: -1 } },
                    {
                        $group: {
                            _id: "$number",
                            message: { $first: "$message" },
                            id: { $first: "$_id" },
                            createdAt: { $first: "$createdAt" },
                            //contact: { $first: "$contact" },
                            //message_type: { $first: "$datatype" },
                            type: { $first: "$type" },
                            twilioNumber: { $first: "$twilioNumber" },
                            isview: {
                                $sum: {
                                    $cond: { if: { $eq: ["$isview", false] }, then: 1, else: 0 },
                                },
                            },
                        },
                    },
                    { $sort: { createdAt: -1 } },
                ]);
                return this.response({ code: 200, message: 'Number List', data: messages });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: [] });
            }
        });
        this.getMessages = (number, user_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.Message.updateMany({ user: user_id, number, isview: false }, { isview: true });
                const messages = yield models_1.Message.find({ number, user: user_id });
                return this.response({ code: 200, message: 'Message List', data: messages });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
        this.readMessage = (number, user_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield models_1.Message.updateMany({ user: user_id, number, isview: false }, { isview: true });
                return this.response({ code: 200, message: 'Message List', data: messages });
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: [] });
            }
        });
    }
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield models_1.Message.find({ user: req.userId });
                return this.response({ code: 200, message: 'All Messages', data: messages });
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: [] });
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield models_1.Message.findById(id);
                if (message) {
                    yield message.deleteOne();
                    return this.response({ code: 200, message: 'Message deleted successfully!', data: message });
                }
                else {
                    return this.response({ code: 400, message: 'Message not found!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: 'Request failed due to an internal error.', data: null });
            }
        });
    }
}
exports.default = new MessageService();
