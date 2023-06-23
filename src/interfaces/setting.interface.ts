import { ObjectId } from "mongoose";

export interface SettingModel {
    user: ObjectId,
    sid: string,
    token: string,
};