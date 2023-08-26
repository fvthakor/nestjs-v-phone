import { ObjectId } from "mongoose";

export interface SettingModel {
    user: ObjectId,
    sid: string,
    token: string,
    app_key: string,
    app_secret: string,
    twiml_app: string
};