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
const twilio = require('twilio');
class CallService extends Service_1.default {
    constructor() {
        super(...arguments);
        this.getToken = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const AccessToken = twilio.jwt.AccessToken;
                const VoiceGrant = AccessToken.VoiceGrant;
                const setting = yield models_1.Setting.findOne({ user: user });
                if (setting) {
                    // Used when generating any kind of tokens
                    const twilioAccountSid = setting.sid;
                    const twilioApiKey = setting.app_key;
                    const twilioApiSecret = setting.app_secret;
                    const outgoingApplicationSid = setting.twiml_app;
                    const identity = user;
                    const voiceGrant = new VoiceGrant({
                        outgoingApplicationSid: outgoingApplicationSid,
                        incomingAllow: true, // Optional: add to allow incoming calls
                    });
                    const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, { identity: identity });
                    token.addGrant(voiceGrant);
                    const tokenData = token.toJwt();
                    return this.response({ code: 200,
                        message: 'access token get!',
                        data: {
                            token: tokenData,
                            identity
                        },
                    });
                }
                else {
                    return this.response({ code: 400, message: 'Please add your setting!', data: null });
                }
            }
            catch (error) {
                return this.response({ code: 500, message: error.message, data: null });
            }
        });
    }
}
exports.default = new CallService();
