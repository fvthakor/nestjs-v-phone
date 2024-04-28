import { Schema, model } from "mongoose";
import { UserModel } from "../interfaces";

const userSchema = new Schema<UserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true},
    role:{type:String, enum: ['admin', 'user', 'super-admin'], required:true, default: 'user'}
}, {timestamps:true});

const User = model<UserModel>('User', userSchema);

export default User;