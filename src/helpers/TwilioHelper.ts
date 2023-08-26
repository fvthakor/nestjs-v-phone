import twilio from 'twilio'
import { MessageModel, NumberSearchModel } from '../interfaces';
class TwilioHelper{
    getClient = () => {
        return twilio(process.env.SID, process.env.TOKEN);
    }

    getPhoneNumbers = async (data:NumberSearchModel) => {
        const client = this.getClient();
        return await client.availablePhoneNumbers('US')
        .local
        .list({areaCode: data.areaCode, limit: 20 , smsEnabled: true, voiceEnabled:true, mmsEnabled:true});
    }

    purchaseNumber = async (number:string) => {
        const client = this.getClient();
        return await client.incomingPhoneNumbers.create({
            phoneNumber: number, 
            voiceUrl: `${process.env.BASE_URL}/call/voice-url`, 
            statusCallback: `${process.env.BASE_URL}/call/status-url`,
            smsUrl: `${process.env.BASE_URL}/message/receive-sms`,
        })
    }

    combineURLs = (...urls:string[])  => {
        let output = urls[0];
        for (let i = 1; i < urls.length; i++) {
            output = output.replace(/\/+$/, '') + '/' + urls[i].replace(/^\/+/, '');
        }
        return output;
    }

    creatTwiml = async (sid:string, token:string) => {
        try {
            const client = twilio(sid, token);
            var twiml = await client.applications.create({
                voiceMethod: "POST",
                voiceUrl: this.combineURLs(
                process.env.BASE_URL ?process.env.BASE_URL.trim() : '',
                "api/voip/make-call"
                ),
                statusCallback: this.combineURLs(
                process.env.BASE_URL ? process.env.BASE_URL.trim() : '',
                "api/voip/call-status"
                ),
                statusCallbackMethod: "POST",
                friendlyName: "VPhone",
            });
            return twiml.sid
        }catch (e){
            console.log(e);
            return false;
        }
    }

    creatAPIKey = async (sid:string, token:string) => {
        try {
            const client = twilio(sid, token);
            var apiKey = await client.newKeys.create({friendlyName: 'VPhone call API Key'})
            return apiKey;
        }catch (e){
            console.log(e);
            return false;
        }
    }

    removeAPIKey = async(sid:string, token:string, api_key:string) => {
        try {
            const client = twilio(sid, token);
            await client.keys(api_key).remove();
            return true;
        }catch (e){
            return false;
        }
    }

    deleteTwiml = async(sid:string, token:string, twimlsid:string) => {
        return new Promise(async (resolve) => {
            try {
                const client = twilio(sid, token);
                await client.applications(twimlsid).remove()
                resolve(true)
            }catch (e){
                console.log(e);
                resolve(false);
            }
        });
    }

    deleteNumber = async(sid:string, token:string, phoneSid:string) =>{
        const client = twilio(sid, token);
        return await client.incomingPhoneNumbers(phoneSid).remove();
    }

    sendMessage(data:MessageModel, sid:string, token:string){
       const client = twilio(sid, token);
        return client.messages
      .create({body: data.message, from: data.twilioNumber, to: data.number})
    }
}

export default new TwilioHelper();