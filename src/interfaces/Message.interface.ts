import { ObjectId } from "mongoose";

export interface MessageModel {
    user: ObjectId,
    number: string,
    twilioNumber: string,
    sid?: string,
    type:"send" | "receive",
    message: string,
    isview: boolean
};