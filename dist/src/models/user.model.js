"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, default: null },
    number: { type: String, required: true, default: null },
    password: { type: String, required: true },
    isProfileUpdate: { type: Boolean, default: false },
    role: { type: String, enum: ['admin', 'user', 'super-admin'], required: true, default: 'user' }
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
