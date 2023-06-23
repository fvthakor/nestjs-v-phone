import mongoose, { Schema, model } from "mongoose";
import { SettingModel } from "../interfaces";


const settingSchema = new Schema<SettingModel>({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sid: { 
        type: String, 
        required: true,
    },
    token: {type: String, required: true},
}, { toJSON: { getters: true } });

const Setting = model<SettingModel>('Setting', settingSchema);

export default Setting;