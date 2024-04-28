import mongoose, { Schema, model } from "mongoose";
import { ChatModel } from "../interfaces";

const chatSchema = new Schema<ChatModel>({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    twilioNumber: {type: String},
    number: {type: String},
}, { toJSON: { getters: true }, timestamps: true });

const Chat = model<ChatModel>('Chat', chatSchema);

export default Chat;