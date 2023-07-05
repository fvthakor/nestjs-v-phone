import { ObjectId } from "mongoose";

export interface ContactModel {
    user: ObjectId,
    name: string,
    number: string
};