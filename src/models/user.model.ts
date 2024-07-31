import { Schema, model } from "mongoose";
import { UserModel } from "../interfaces";

const userSchema = new Schema<UserModel>({
    name: { type: String, required: true },
    email: { type: String, required:false, default: null },
    number: { type: String, required:true, default: null },
    password: {type: String, required: true},
    isProfileUpdate: {type: Boolean, default: false},
    role:{type:String, enum: ['admin', 'user', 'super-admin'], required:true, default: 'user'}
}, {timestamps:true});

const User = model<UserModel>('User', userSchema);

export default User;