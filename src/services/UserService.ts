import { UserModel } from "../interfaces";
import { User } from "../models";
import * as bcrypt from 'bcrypt' 
import Service from "./Service";

class UserService extends Service{
    async create(data:UserModel){
        try{ 
            console.log('data',data);
            const hash = await bcrypt.hash(data.password, process.env.PASSWORD_SALT ? +process.env.PASSWORD_SALT : 10);
            const user = await User.create({...data, password: hash});
            return this.response({code: 201, message: 'User added successfully!', data: user})
        }catch(error){
            console.log(error);
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getOne(id:string){
        try{
            const user = await User.findById(id);
            return user 
                ? this.response({code: 200, message: 'User by id!', data: user}) 
                : this.response({code: 400, message: 'User not found!', data: null}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async update(id:string, data:UserModel){
        try{
            const user = await User.findByIdAndUpdate(id, data, {new:true});
            if(user){
                return this.response({code: 200, message: 'User updated successfully!', data: user}) 
            }else{
                return this.response({code: 400, message: 'User not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getAll(){
        try{
            const users = await User.find();
            return this.response({code: 200, message: 'All Users', data: users}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: []})
        }
    }

    async delete(id:number){
        try{
            const user = await User.findByIdAndDelete(id);
            if(user){
                return this.response({code: 200, message: 'User deleted successfully!', data: user}) 
            }else{
                return this.response({code: 400, message: 'User not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }
}

export default new UserService();