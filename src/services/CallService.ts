import { Setting } from "../models";
import Service from "./Service";
const twilio = require('twilio');
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
}

export default new CallService();