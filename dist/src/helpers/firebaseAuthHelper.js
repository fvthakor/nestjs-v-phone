"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const otpGenerator = __importStar(require("otp-generator"));
const serviceAccount = require('./../../firebase.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
class FirebaseHelper {
    constructor() {
        this.sendOTP = () => __awaiter(this, void 0, void 0, function* () {
            const phoneNumber = '+918490029343';
            try {
                // Generate OTP
                const otp = otpGenerator.generate(6, { digits: true });
                // Send OTP to the provided phone number
                yield admin.auth().sendSignInLinkToPhone(phoneNumber, new admin.auth.RecaptchaVerifier({ size: 'invisible' }))
                    .then((verificationId) => {
                    console.log('OTP sent successfully to', phoneNumber);
                    res.status(200).send({ success: true, message: "OTP sent successfully", verificationId: verificationId });
                })
                    .catch((error) => {
                    console.error('Error sending OTP:', error);
                    res.status(500).send({ success: false, message: "Failed to send OTP" });
                });
            }
            catch (error) {
                console.error('Error generating OTP:', error);
                res.status(500).send({ success: false, message: "Failed to generate OTP" });
            }
        });
        this.verifyOTP = () => __awaiter(this, void 0, void 0, function* () {
            const verificationId = 'dsadadada';
            const otp = '5445';
            // const { verificationId, otp } = req.body;
            try {
                // Verify OTP
                yield admin.auth().checkOtp(verificationId, otp)
                    .then(() => {
                    console.log('OTP verified successfully');
                    //res.status(200).send({ success: true, message: "OTP verified successfully" });
                })
                    .catch((error) => {
                    console.error('Error verifying OTP:', error);
                    //res.status(400).send({ success: false, message: "Invalid OTP" });
                });
            }
            catch (error) {
                console.error('Error verifying OTP:', error);
                //res.status(500).send({ success: false, message: "Failed to verify OTP" });
            }
        });
    }
}
exports.default = new FirebaseHelper();
