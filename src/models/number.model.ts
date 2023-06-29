import mongoose, { Schema, model } from "mongoose";
import { NumberModel } from "../interfaces";


const numberSchema = new Schema<NumberModel>({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sid: { 
        type: String, 
        required: true,
    },
    number: {type: String, required: true},
}, { toJSON: { getters: true } , timestamps:true});

const Number = model<NumberModel>('Number', numberSchema);

export default Number;