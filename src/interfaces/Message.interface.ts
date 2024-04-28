import { ObjectId } from "mongoose";

export interface MessageModel {
    user: ObjectId,
    chatId: ObjectId | null,
    number: string,
    twilioNumber: string,
    sid?: string,
    type:"send" | "receive",
    message: string,
    isview: boolean,
    
};