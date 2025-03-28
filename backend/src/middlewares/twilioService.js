import { config } from 'dotenv';
import twilio from 'twilio'

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

const sendSMS = async (number, message) => {
    try {
        console.log("im under thw water")
        const res = await client.messages.create({
            body: message,
            from:config.TWILIO_NUMBER,
            to: number
        });
        console.log("working twilio",res.sid);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default sendSMS;