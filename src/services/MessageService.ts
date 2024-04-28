import { MessageModel, NumberSearchModel } from "../interfaces";
import { Chat, Message, Number, Setting } from "../models";
import Service from "./Service";
import { TwilioHelper } from "../helpers";
import RequestCustom from "../interfaces/RequestCustom.interface";
import { Request } from "express";
import twilio from "twilio";
import mongoose, { ObjectId } from "mongoose";

class MessageService extends Service{
    sendMessage = async(data: MessageModel) => {
        try{
            const setting = await Setting.findOne({user: data.user});
            if(setting){
                // const chatInbox = await Chat.findOne({
                //     number: data.number,
                //     twilioNumber: data.twilioNumber,
                // })
                let chatId:any = null;
                // if(chatInbox){
                //     chatId = chatInbox._id;
                // }else{
                //     const chatInbox = await Chat.create({
                //         user: data.user,
                //         number: data.number,
                //         twilioNumber: data.twilioNumber,
                //     })
                //     chatId = chatInbox._id;
                // }
                const sendMessage = process.env.MODE === 'developer' ? {sid: 'TEST-54654564665464-fsdffs'} : await TwilioHelper.sendMessage(data, setting.sid, setting.token);
                const messageData:MessageModel = {
                    ...data,
                    sid: sendMessage.sid,
                    type: 'send',
                    isview: true,
                    chatId: chatId
                }
                const message = await Message.create(messageData);
                return this.response({code: 200, message: 'Message send successfully!', data: message})
            }else{
                return this.response({code: 400, message: 'Setting not found! Please add first setting!', data: null})
            }
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: null})
        }
    }

    receiveMessage = async(req:RequestCustom) => {
        const VoiceResponse = twilio.twiml.VoiceResponse;
        const response = new VoiceResponse();
        try{
            const { Body, To, From, SmsSid } = req.body;
            Setting.findOne({number: To}).then(async (number) => {
                if(number){
                    // const chatInbox = await Chat.findOne({
                    //     number: From,
                    //     twilioNumber: To,
                    // })
                    let chatId:any = null;
                    // if(chatInbox){
                    //     chatId = chatInbox._id;
                    // }else{
                    //     const chatInbox = await Chat.create({
                    //         user: number.user,
                    //         number: From,
                    //         twilioNumber: To,
                    //     })
                    //     chatId = chatInbox._id;
                    // }

                    const messageData:MessageModel = {
                        message: Body,
                        sid: SmsSid,
                        type: 'receive',
                        user: number.user,
                        number: From,
                        twilioNumber: To,
                        isview: false,
                        chatId: chatId

                    }
                    const message = await Message.create(messageData);
                    // req.io?.to(`${number.user}`).emit('receiveMessage',message);
    
                    req.io?.to(`${number.user}`).emit("message", {
                        type: 'receiveMessage',
                        data: message,
                    });
                }
            });
        }catch(error:any){
            console.log(error.message);
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
                { $sort: { createdAt: -1 } },
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