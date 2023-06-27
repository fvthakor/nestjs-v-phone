import { ObjectId } from "mongoose";

export interface NumberModel {
    user: ObjectId,
    sid?: string,
    number: string,
};