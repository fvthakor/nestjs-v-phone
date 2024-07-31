import mongoose, { Schema, model } from "mongoose";
import { PlanModel } from "../interfaces";

const planSchema = new Schema<PlanModel>({
    title: {type: String},
    day: {type: String, enum: ['day', 'month'], default: 'month'},
    callingCharge: {type: Number},
    balance: {type: Number},
    numbers: {type: Number},
    smsCharge: {type: Number},
    voiceMailCharge: {type: Number},
    recordingCharge: {type: Number},
    price: {type: Number},
}, { toJSON: { getters: true }, timestamps: true });

const Plan = model<PlanModel>('Plan', planSchema);

export default Plan;