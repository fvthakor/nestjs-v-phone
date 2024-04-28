import mongoose, { Schema, model } from "mongoose";
import { MessageModel } from "../interfaces";


const messageSchema = new Schema<MessageModel>({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chatId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        default: null
    },
    number: {type: String, required: true},
    twilioNumber: {type: String, required: true},
    sid: { 
        type: String, 
        required: true,
    },
    type: {
        type: String,
        enum: ["send", "receive"],
        default: "send"
    },
    message: {
        type: String,
        required: true
    },
    isview:{
        type:Boolean,
        default: false
    }
}, { toJSON: { getters: true }, timestamps: true });

const Message = model<MessageModel>('Message', messageSchema);

export default Message;