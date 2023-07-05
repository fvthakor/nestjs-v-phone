import mongoose from "mongoose";

import { ContactModel, SettingModel } from "../interfaces";
import { Contact, Setting } from "../models";
import Service from "./Service";
import commonHelper from "../helpers/commonHelper";
import TwilioHelper from "../helpers/TwilioHelper";

class ContactService extends Service{

    async create(data:ContactModel){
        try{ 
            const contact = await Setting.create(data);
            return this.response({code: 201, message: 'Contact added successfully!', data: contact})
        }catch(error){
            console.log(error);
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getOne(id:string){
        try{
            const contact = await Contact.findById(id);
            return contact 
                ? this.response({code: 200, message: 'Contact by id!', data: contact}) 
                : this.response({code: 400, message: 'Contact not found!', data: null}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getAll(userId:string){
        try{
            const contact = await Contact.find({user: userId });
            return contact 
                ? this.response({code: 200, message: 'Contact by user!', data: contact}) 
                : this.response({code: 400, message: 'Contact not found!', data: null}) 
        }catch(error:any){
            console.log(error); 
            return this.response({code: 500, message:error.message, data: null})
        }
    }

    async update(id:string, data:ContactModel){
        try{
            const contact = await Contact.findByIdAndUpdate(id, data, {new:true});
            if(contact){
                return this.response({code: 200, message: 'Contact updated successfully!', data: contact}) 
            }else{
                return this.response({code: 400, message: 'Contact not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    // async getAll(){
    //     try{
    //         const settings = await Setting.find();
    //         return this.response({code: 200, message: 'All Settings', data: settings}) 
    //     }catch(error){
    //         return this.response({code: 500, message: 'Request failed due to an internal error.', data: []})
    //     }
    // }

    async delete(id:number){
        try{
            const contact = await Contact.findByIdAndDelete(id);
            if(contact){
                return this.response({code: 200, message: 'Contact deleted successfully!', data: contact}) 
            }else{
                return this.response({code: 400, message: 'Contact not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }
}

export default new ContactService();