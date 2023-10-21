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
        this.addNumberToAccount = (number, sid, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = (0, twilio_1.default)(sid, token);
                const numbers = yield client.incomingPhoneNumbers.list({ phoneNumber: number, limit: 1 });
                const number2 = numbers.length > 0 ? numbers[0] : null;
                if (number2) {
                    return yield client.incomingPhoneNumbers(number2.sid)
                        .update({
                        voiceUrl: `${process.env.BASE_URL}/call/voice-url`,
                        statusCallback: `${process.env.BASE_URL}/call/status-url`,
                        smsUrl: `${process.env.BASE_URL}/message/receive-sms`,
                    });
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
        this.combineURLs = (...urls) => {
            let output = urls[0];
            for (let i = 1; i < urls.length; i++) {
                output = output.replace(/\/+$/, '') + '/' + urls[i].replace(/^\/+/, '');
            }
            return output;
        };
        this.creatTwiml = (sid, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = (0, twilio_1.default)(sid, token);
                var twiml = yield client.applications.create({
                    voiceMethod: "POST",
                    voiceUrl: this.combineURLs(process.env.BASE_URL ? process.env.BASE_URL.trim() : '', "api/voip/make-call"),
                    statusCallback: this.combineURLs(process.env.BASE_URL ? process.env.BASE_URL.trim() : '', "api/voip/call-status"),
                    statusCallbackMethod: "POST",
                    friendlyName: "VPhone",
                });
                return twiml.sid;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        });
        this.creatAPIKey = (sid, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = (0, twilio_1.default)(sid, token);
                var apiKey = yield client.newKeys.create({ friendlyName: 'VPhone call API Key' });
                return apiKey;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        });
        this.removeAPIKey = (sid, token, api_key) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = (0, twilio_1.default)(sid, token);
                yield client.keys(api_key).remove();
                return true;
            }
            catch (e) {
                return false;
            }
        });
        this.deleteTwiml = (sid, token, twimlsid) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const client = (0, twilio_1.default)(sid, token);
                    yield client.applications(twimlsid).remove();
                    resolve(true);
                }
                catch (e) {
                    console.log(e);
                    resolve(false);
                }
            }));
        });
        this.deleteNumber = (sid, token, phoneSid) => __awaiter(this, void 0, void 0, function* () {
            const client = (0, twilio_1.default)(sid, token);
            return yield client.incomingPhoneNumbers(phoneSid).remove();
        });
    }
    sendMessage(data, sid, token) {
        const client = (0, twilio_1.default)(sid, token);
        return client.messages.create({ body: data.message, from: data.twilioNumber, to: data.number });
    }
}
exports.default = new TwilioHelper();
