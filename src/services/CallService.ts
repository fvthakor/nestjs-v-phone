import { Request } from "express";
import { Setting } from "../models";
import Service from "./Service";
import twilio from "twilio";
class CallService extends Service{
    getToken = async (user:string) => {
        try{
            const AccessToken = twilio.jwt.AccessToken;
            const VoiceGrant = AccessToken.VoiceGrant;
            
            const setting = await Setting.findOne({user: user});
            if(setting){
                // Used when generating any kind of tokens
                const twilioAccountSid = setting.sid;
                const twilioApiKey =  setting.app_key;
                const twilioApiSecret = setting.app_secret;
                const outgoingApplicationSid = setting.twiml_app;
                const identity = user;

                const voiceGrant = new VoiceGrant({
                    outgoingApplicationSid: outgoingApplicationSid,
                    incomingAllow: true, // Optional: add to allow incoming calls
                });
                const token = new AccessToken(
                    twilioAccountSid,
                    twilioApiKey,
                    twilioApiSecret,
                    {identity: identity}
                );
                token.addGrant(voiceGrant);
                const tokenData = token.toJwt();
                return this.response(
                    {   code: 200, 
                        message: 'access token get!', 
                        data: {
                            token: tokenData,
                            identity
                        }, 
                    })
            }else{
                return this.response({code: 400, message: 'Please add your setting!', data: null})
            }
        }catch(error:any){
            return this.response({code: 500, message: error.message, data: null})
        }
    }

    makeCall = async(req:Request) => {
        const {phoneNumber} = req.body;
        const VoiceResponse = twilio.twiml.VoiceResponse;
        const response = new VoiceResponse();
        try{
            //const response = new VoiceResponse();
            const dial = response.dial({
                callerId: '+15102885071'
            });
            dial.number('+1'+phoneNumber);
            //const { Body, To, From, SmsSid } = req.body;
            // Setting.findOne({number: To}).then(async (number) => {
            //     if(number){
            //         const messageData:MessageModel = {
            //             message: Body,
            //             sid: SmsSid,
            //             type: 'receive',
            //             user: number.user,
            //             number: From,
            //             twilioNumber: To,
            //             isview: false
            //         }
            //         const message = await Message.create(messageData);
            //         // req.io?.to(`${number.user}`).emit('receiveMessage',message);
    
            //         req.io?.to(`${number.user}`).emit("message", {
            //             type: 'receiveMessage',
            //             data: message,
            //         });
            //     }
            // });
        }catch(error:any){
            console.log(error.message);
            //return this.response({code: 500, message: error.message, data: null})
        }  
        return response;
    }
}

export default new CallService();