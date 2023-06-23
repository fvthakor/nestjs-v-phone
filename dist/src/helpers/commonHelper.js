"use strict";
// import crypto from 'crypto'
// import { Buffer } from 'node:buffer';
// const algorithm = "aes-128-cbc";
Object.defineProperty(exports, "__esModule", { value: true });
// const encryptedString = (message:string) => {
//     return new Promise(async (resolve) => {
//         try {
//             var iv = crypto.randomBytes(16)
//             const Securitykey1 = process.env.COOKIE_KEY ? process.env.COOKIE_KEY : 'please_add_value_inenv';
//             var keyhex = Buffer.from(Securitykey1,'base64').toString('hex')
//            const Securitykey = Buffer.from(Securitykey1, 'base64')
//            const key = crypto.createHash('sha256').update(String(Securitykey1)).digest('base64').slice(0, 16)
//             const cipher = crypto.createCipheriv('aes-128-ctr', key, iv);
//             let encryptedData = cipher.update(message, "utf-8", "hex");
//             resolve(encryptedData);
//         }catch (e){
//             console.log(e);
//             resolve(false);
//         }
//     });
// }
// const decryptedString = (message:string) => {
//     return new Promise(async (resolve) => {
//         try {
//             console.log(message);
//             const initVector = crypto.randomBytes(16);
//             const Securitykey = process.env.COOKIE_KEY ? process.env.COOKIE_KEY : 'please_add_value_inenv';
//             const key = crypto.createHash('sha256').update(String(Securitykey)).digest('base64').slice(0, 16)
//             const cipher = crypto.createCipheriv(algorithm, key, initVector);
//             let encryptedData = cipher.update(message, "utf-8", "hex");
//             resolve(encryptedData);
//         }catch (e){
//             console.log(e);
//             resolve(false);
//         }
//     });
// }
// export {
//     encryptedString, 
//     decryptedString
// }
class CommonHelper {
    constructor() {
        this.encryptedString = (message) => {
            const salt = process.env.KEY ? process.env.KEY : 'mySecretSalt';
            //const salt = process.env.KEY ? process.env.KEY : 'test'
            const textToChars = (text) => text.split('').map(c => c.charCodeAt(0));
            const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
            const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
            return message.split('')
                .map(textToChars)
                .map(applySaltToChar)
                .map(byteHex)
                .join('');
        };
        this.decryptedString = (message) => {
            const salt = process.env.KEY ? process.env.KEY : 'mySecretSalt';
            const textToChars = (text) => text.split('').map(c => c.charCodeAt(0));
            const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
            return message.match(/.{1,2}/g)
                .map((hex) => parseInt(hex, 16))
                .map(applySaltToChar)
                .map((charCode) => String.fromCharCode(charCode))
                .join('');
        };
    }
}
exports.default = new CommonHelper();
// const cipher = (salt:string) => {
//     const textToChars = (text:string) => text.split('').map(c => c.charCodeAt(0));
//     const byteHex = (n:number) => ("0" + Number(n).toString(16)).substr(-2);
//     const applySaltToChar = (code:any) => textToChars(salt).reduce((a,b) => a ^ b, code);
//     return (text:string) => text.split('')
//       .map(textToChars)
//       .map(applySaltToChar)
//       .map(byteHex)
//       .join('');
// }
// const decipher = (salt:string) => {
//     const textToChars = (text:string) => text.split('').map(c => c.charCodeAt(0));
//     const applySaltToChar = (code:any) => textToChars(salt).reduce((a,b) => a ^ b, code);
//     return (encoded:any) => encoded.match(/.{1,2}/g)
//       .map((hex:string) => parseInt(hex, 16))
//       .map(applySaltToChar)
//       .map((charCode:any) => String.fromCharCode(charCode))
//       .join('');
// }
// export {
//     cipher, 
//     decipher
// }
