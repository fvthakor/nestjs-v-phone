import { PlanModel, UserModel } from "../interfaces";
import { Plan, User } from "../models";
import * as bcrypt from 'bcrypt' 
import Service from "./Service";

class PlanService extends Service{
    async create(data:PlanModel){
        try{ 
            console.log('data',data);
            // const hash = await bcrypt.hash(data.password, process.env.PASSWORD_SALT ? +process.env.PASSWORD_SALT : 10);
            const user = await Plan.create({...data});
            return this.response({code: 201, message: 'Plan added successfully!', data: user})
        }catch(error){
            console.log(error);
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getOne(id:string){
        try{
            const user = await Plan.findById(id);
            return user 
                ? this.response({code: 200, message: 'Plan by id!', data: user}) 
                : this.response({code: 400, message: 'Plan not found!', data: null}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async update(id:string, data:PlanModel){
        try{
            const user = await Plan.findByIdAndUpdate(id, data, {new:true});
            if(user){
                return this.response({code: 200, message: 'Plan updated successfully!', data: user}) 
            }else{
                return this.response({code: 400, message: 'Plan not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getAll(){
        try{
            const users = await Plan.find();
            return this.response({code: 200, message: 'All Plans', data: users}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: []})
        }
    }

    async delete(id:string){
        try{
            console.log(id);
            const user = await Plan.findByIdAndDelete(id);
            if(user){
                return this.response({code: 200, message: 'Plan deleted successfully!', data: user}) 
            }else{
                return this.response({code: 400, message: 'Plan not found!', data: null}) 
            }
        }catch(error){
            console.log(error);
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }
}

export default new PlanService();