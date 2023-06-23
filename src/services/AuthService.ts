
import { LoginModel, UserModel } from "../interfaces";
import {User} from "../models";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import Service from "./Service";
class AuthService extends Service{
    register = async (data:UserModel) => {
        try{
            const user = await User.create(data)
            return this.response(
                {   code: 200, 
                    message: 'Register successfull!', 
                    data: user, 
                })
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: null})
        }
    }

    login = async (data:LoginModel) =>{
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