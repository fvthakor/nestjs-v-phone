"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const planSchema = new mongoose_1.Schema({
    title: { type: String },
    day: { type: String, enum: ['day', 'month'], default: 'month' },
    callingCharge: { type: Number },
    balance: { type: Number },
    numbers: { type: Number },
    smsCharge: { type: Number },
    voiceMailCharge: { type: Number },
    recordingCharge: { type: Number },
    price: { type: Number },
}, { toJSON: { getters: true }, timestamps: true });
const Plan = (0, mongoose_1.model)('Plan', planSchema);
exports.default = Plan;
