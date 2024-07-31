import { ObjectId } from "mongoose";

export interface PlanModel {
    title: string,
    day: 'day' | 'month',
    callingCharge: number,
    balance: number,
    numbers: number,
    smsCharge:number,
    voiceMailCharge: number,
    recordingCharge: number,
    price:number
};