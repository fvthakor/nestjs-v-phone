import { NumberSearchModel } from "../interfaces";
import { Number, Setting } from "../models";
import Service from "./Service";
import { TwilioHelper } from "../helpers";
import RequestCustom from "../interfaces/RequestCustom.interface";

class NumberService extends Service{
    getNumbers = async(data: NumberSearchModel) => {
        try{
            const numbers = await TwilioHelper.getPhoneNumbers(data);
            return this.response({code: 200, message: 'Number added successfully!', data: numbers})
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: null})
        }
    }

    purchaseNumbers = async (numbers: string[], userId:string) => {
        try{
            const numbersData = [];
            // const number = []
            for(let number of numbers){
                const purchasedNumber = await TwilioHelper.purchaseNumber(number);
                // const purchasedNumber = {
                //     sid: `ABABABABABAABBABB-${new Date().getTime()}`
                // }
                numbersData.push({
                    user: userId,
                    sid: purchasedNumber.sid,
                    number
                });
            }
            if(numbersData.length > 0){
            await Number.create(numbersData);
            const insertednumber = await Number.find({number: {$in: numbers}});
            return this.response({code: 201, message: 'Number purchased successfully!', data: insertednumber})
            }else{
                return this.response({code: 400, message: 'Number not purchased!', data: null}) 
            }
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: null})
        }
    }

    async getOne(id:string){
        try{
            const number = await Number.findById(id);
            return number 
                ? this.response({code: 200, message: 'Number by id!', data: number}) 
                : this.response({code: 400, message: 'Number not found!', data: null}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }

    async getAll(req:RequestCustom){
        try{
            console.log(req.userId);
            const numbers = await Number.find({user: req.userId});
            return this.response({code: 200, message: 'All Numbers', data: numbers}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: []})
        }
    }

    async delete(id:string, userId:string){
        try{
            const number = await Number.findById(id);
            if(number){
                const setting = await Setting.findOne({user: userId})
                if(setting){
                    await TwilioHelper.deleteNumber(setting.sid, setting.token, number.sid  ? number.sid : '');
                }
                await number.deleteOne();
                return this.response({code: 200, message: 'Number deleted successfully!', data: number}) 
            }else{
                return this.response({code: 400, message: 'Number not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }
}

export default new NumberService();