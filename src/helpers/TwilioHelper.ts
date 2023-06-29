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

    deleteNumber = async(sid:string) =>{
        const client = this.getClient();
        return await client.incomingPhoneNumbers(sid).remove();
    }

    sendMessage(data:MessageModel){
       const client = this.getClient();
        return client.messages
      .create({body: data.message, from: data.twilioNumber, to: data.number})
      //.then(message => console.log(message.sid));
    }
}

export default new TwilioHelper();