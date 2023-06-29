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
const twilio_1 = __importDefault(require("twilio"));
class TwilioHelper {
    constructor() {
        this.getClient = () => {
            return (0, twilio_1.default)(process.env.SID, process.env.TOKEN);
        };
        this.getPhoneNumbers = (data) => __awaiter(this, void 0, void 0, function* () {
            const client = this.getClient();
            return yield client.availablePhoneNumbers('US')
                .local
                .list({ areaCode: data.areaCode, limit: 20, smsEnabled: true, voiceEnabled: true, mmsEnabled: true });
        });
        this.purchaseNumber = (number) => __awaiter(this, void 0, void 0, function* () {
            const client = this.getClient();
            return yield client.incomingPhoneNumbers.create({
                phoneNumber: number,
                voiceUrl: `${process.env.BASE_URL}/call/voice-url`,
                statusCallback: `${process.env.BASE_URL}/call/status-url`,
                smsUrl: `${process.env.BASE_URL}/message/receive-sms`,
            });
        });
        this.deleteNumber = (sid) => __awaiter(this, void 0, void 0, function* () {
            const client = this.getClient();
            return yield client.incomingPhoneNumbers(sid).remove();
        });
    }
    sendMessage(data) {
        const client = this.getClient();
        return client.messages
            .create({ body: data.message, from: data.twilioNumber, to: data.number });
        //.then(message => console.log(message.sid));
    }
}
exports.default = new TwilioHelper();
