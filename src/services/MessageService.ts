import { MessageModel, NumberSearchModel } from "../interfaces";
import { Message, Number } from "../models";
import Service from "./Service";
import { TwilioHelper } from "../helpers";
import RequestCustom from "../interfaces/RequestCustom.interface";
import { Request } from "express";
import twilio from "twilio";
import mongoose from "mongoose";

class MessageService extends Service{
    sendMessage = async(data: MessageModel) => {
        try{
            //const sendMessage = await TwilioHelper.sendMessage(data);
            const sendMessage = {
                sid: `MESSAGE_FACK_ID-XXXXXXXX-${new Date().getTime()}`
            }
            
            const messageData:MessageModel = {
                ...data,
                sid: sendMessage.sid,
                type: 'send',
                isview: true
            }
            const message = await Message.create(messageData);
            return this.response({code: 200, message: 'Message send successfully!', data: message})
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: null})
        }
    }

    receiveMessage = async(req:RequestCustom) => {
        const VoiceResponse = twilio.twiml.VoiceResponse;
        const response = new VoiceResponse();
        try{
            const { Body, To, From, SmsSid } = req.body;
            const number = await Number.findOne({number: To});
            if(number){
                const messageData:MessageModel = {
                    message: Body,
                    sid: SmsSid,
                    type: 'receive',
                    user: number.user,
                    number: From,
                    twilioNumber: To,
                    isview: false
                }
                const message = await Message.create(messageData);
                req.io?.to(`${number.user}`).emit('receiveMessage',message);
            }
        }catch(error:any){
            //console.log(error.message);
            //return this.response({code: 500, message: error.message, data: null})
        }  
        return response;
    }

    numberList = async(req:RequestCustom) => {
        try{
            const user_id = new mongoose.Types.ObjectId(req.userId);

            const messages = await Message.aggregate([
                { $match: { user: user_id } },
                { $sort: { _id: -1 } },
                {
                  $group: {
                    _id: "$number",
                    message: { $first: "$message" },
                    id: { $first: "$_id" },
                    createdAt: { $first: "$createdAt" },
                    //contact: { $first: "$contact" },
                    //message_type: { $first: "$datatype" },
                    type: { $first: "$type" },
                    twilioNumber: { $first: "$twilioNumber" },
                    isview: {
                      $sum: {
                        $cond: { if: { $eq: ["$isview", false] }, then: 1, else: 0 },
                      },
                    },
                  },
                },
              ]);
              return this.response({code: 200, message: 'Number List', data: messages})
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: []})
        }
    }

    getMessages = async(number:string, user_id:string) => {
        try{
            await Message.updateMany({user: user_id, number, isview: false}, {isview: true});
            const messages = await Message.find({number, user: user_id})
            return this.response({code: 200, message: 'Message List', data: messages})
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: []})
        }
    }
    
    readMessage = async (number:string, user_id:string) => {
        try{
            const messages = await Message.updateMany({user: user_id, number, isview: false}, {isview: true});
            return this.response({code: 200, message: 'Message List', data: messages})
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: []})
        }
    }

    async getAll(req:RequestCustom){
        try{
            const messages = await Message.find({user: req.userId});
            return this.response({code: 200, message: 'All Messages', data: messages}) 
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: []})
        }
    }

    async delete(id:string){
        try{
            const message = await Message.findById(id);
            if(message){
                await message.deleteOne();
                return this.response({code: 200, message: 'Message deleted successfully!', data: message}) 
            }else{
                return this.response({code: 400, message: 'Message not found!', data: null}) 
            }
        }catch(error){
            return this.response({code: 500, message: 'Request failed due to an internal error.', data: null})
        }
    }
}

export default new MessageService();