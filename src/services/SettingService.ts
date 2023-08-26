import mongoose from "mongoose";

import { SettingModel } from "../interfaces";
import { Setting } from "../models";
import Service from "./Service";
import commonHelper from "../helpers/commonHelper";
import TwilioHelper from "../helpers/TwilioHelper";

class SettingService extends Service{

    async create(data:SettingModel){
        try{ 
            const checkSetting = await Setting.findOne({user: data.user});
            const twiml_app = await TwilioHelper.creatTwiml(
                data.sid,
                data.token
            );
            if(twiml_app){
                data.twiml_app = twiml_app
                const appData = await TwilioHelper.creatAPIKey(
                    data.sid,
                    data.token
                );
                if(appData){
                    data.app_key = appData.sid;
                    data.app_secret = appData.secret;
                }else{
                    return this.response({code: 400, message: 'Something was wrong!', data: null}) 
                }
            }else{
                return this.response({code: 400, message: 'Something was wrong!', data: null})
            }
            const sid = await commonHelper.encryptedString(data.sid)
            const token = await commonHelper.encryptedString(data.token)
            let setting;
            const updateData = {...data, sid, token};
            if(checkSetting){
                if(checkSetting.app_key){
                    await TwilioHelper.removeAPIKey(
                        checkSetting.sid,
                        checkSetting.token,
                        checkSetting.app_key
                      );
                }
                if(checkSetting.twiml_app){
                    await TwilioHelper.deleteTwiml(
                        checkSetting.sid,
                        checkSetting.token,
                        checkSetting.twiml_app
                      );
                }
                setting = await Setting.findOneAndUpdate({user: data.user}, updateData, {new: true});
            }else{
                setting = await Setting.create(updateData);
            }
            return this.response({code: 201, message: 'Setting added successfully!', data: {...setting?.toJSON()}})
        }catch(error){
            console.log(error);
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getOne(id:string){
        try{
            const setting = await Setting.findById(id);
            return setting 
                ? this.response({code: 200, message: 'Setting by id!', data: setting}) 
                : this.response({code: 400, message: 'Setting not found!', data: null}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getByUser(userId:string){
        try{
            const setting = await Setting.findOne({user: userId });
            console.log(setting ? await commonHelper.decryptedString(setting.sid) : '');
            console.log(setting ? commonHelper.decryptedString(setting.token) : '');
            return setting 
                ? this.response({code: 200, message: 'Setting by user!', data: {...setting.toJSON()}}) 
                : this.response({code: 400, message: 'Setting not found!', data: null}) 
        }catch(error:any){
            console.log(error); 
            return this.response({code: 500, message:error.message, data: null})
        }
    }

    async update(id:string, data:SettingModel){
        try{
            const setting = await Setting.findByIdAndUpdate(id, data, {new:true});
            if(setting){
                return this.response({code: 200, message: 'Setting updated successfully!', data: setting}) 
            }else{
                return this.response({code: 400, message: 'Setting not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getAll(){
        try{
            const settings = await Setting.find();
            return this.response({code: 200, message: 'All Settings', data: settings}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: []})
        }
    }

    async delete(id:number){
        try{
            const setting = await Setting.findByIdAndDelete(id);
            if(setting){
                return this.response({code: 200, message: 'Setting deleted successfully!', data: setting}) 
            }else{
                return this.response({code: 400, message: 'Setting not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }
}

export default new SettingService();