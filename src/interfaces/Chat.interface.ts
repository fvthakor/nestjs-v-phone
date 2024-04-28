import { ObjectId } from "mongoose";

export interface ChatModel {
    user: ObjectId,
    number: string,
    twilioNumber: string
};