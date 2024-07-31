"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecaptchaVerifier = exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
Object.defineProperty(exports, "RecaptchaVerifier", { enumerable: true, get: function () { return auth_1.RecaptchaVerifier; } });
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
