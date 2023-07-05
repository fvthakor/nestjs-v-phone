import mongoose, { Schema, model } from "mongoose";
import { ContactModel } from "../interfaces";

const contactSchema = new Schema<ContactModel>({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {type: String},
    number: {type: String},
}, { toJSON: { getters: true }, timestamps: true });

const Contact = model<ContactModel>('Contact', contactSchema);

export default Contact;