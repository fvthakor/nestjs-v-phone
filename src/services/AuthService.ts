
import { LoginModel, UserModel } from "../interfaces";
import {User} from "../models";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import Service from "./Service";
import { Response } from "express";
class AuthService extends Service{
    register = async (data:UserModel) => {
        try{
            const checkEmail = await User.findOne({
                email: data.email
            });
            if(checkEmail){
                return this.response({ code: 400,  message: 'Email Already exits!', data: []});
            }
            const hash = await bcrypt.hash(data.password, process.env.PASSWORD_SALT ? +process.env.PASSWORD_SALT : 10);
            const user = await User.create({...data, password: hash})
            return this.response(
                {   code: 200, 
                    message: 'Register successfull!', 
                    data: user, 
                })
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: null})
        }
    }

    login = async (data:LoginModel, res:Response) =>{
        const user = await User.findOne({email: data.email});
        if(user){
            const checkPassword =  await bcrypt.compare(data.password, user.password);
            if(checkPassword){
                const userData = {
                    _id: user._id,
                    name: user.name,
                    role: user.role,
                    email: user.email
                }
                const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'drc');
                res.cookie(`loginToken`,`${token}`);
                return this.response(
                    {   code: 200, 
                        message: 'Login successfull!.', 
                        data: {...userData, token: token}, 
                    })
            }else{
                return this.response({code: 400, message: 'Email or Password is wrong!.', data: null})
            }
        }else{
            return this.response({code: 400, message: 'Email or Password is wrong!.', data: null})
        }
    }

    logout =async (userId:string, res:Response)=>{
        //res.cookie(`loginToken`,`${token}`);
        res.clearCookie("loginToken");
        return this.response(
            {   code: 200, 
                message: 'Logout successfull!.', 
                data: {}, 
            })
    }

    superAdminlogin = async (data:LoginModel, res:Response, loginType: string) =>{
        const user = await User.findOne({email: data.email, role: loginType});
        if(user){
            const checkPassword =  await bcrypt.compare(data.password, user.password);
            if(checkPassword){
                const userData = {
                    _id: user._id,
                    name: user.name,
                    role: user.role,
                    email: user.email
                }
                const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'drc');

                loginType == 'super-admin' ? res.cookie(`loginToken`,`${token}`) : res.cookie(`adminLoginToken`,`${token}`);
                return this.response(
                    {   code: 200, 
                        message: 'Login successfull!.', 
                        data: {...userData, token: token}, 
                    })
            }else{
                return this.response({code: 400, message: 'Email or Password is wrong!.', data: null})
            }
        }else{
            return this.response({code: 400, message: 'Email or Password is wrong!.', data: null})
        }
    }
}

export default new AuthService();