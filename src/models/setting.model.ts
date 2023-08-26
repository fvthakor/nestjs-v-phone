import mongoose, { Schema, model } from "mongoose";
import { SettingModel } from "../interfaces";
import { commonHelper } from "../helpers";


const settingSchema = new Schema<SettingModel>({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sid: { 
        type: String, 
        required: true,
        get: (value: any) => {
            return value
                    ? commonHelper.decryptedString(value)
                    : '' ; 
        }
    },
    token: {type: String, required: true, 

        get: (value: any) => {
            return  value
                    ? commonHelper.decryptedString(value)
                    : '';
        }},
    app_key: {type: String},
    app_secret: {type: String},
    twiml_app: {type: String},

}, { toJSON: { getters: true }, timestamps:true });

const Setting = model<SettingModel>('Setting', settingSchema);

export default Setting;