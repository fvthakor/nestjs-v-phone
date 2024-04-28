import {Request, Response } from "express";
import { AuthService, CallService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class CallController{
    constructor(){
        
    }

   getToken = async(req:RequestCustom, res:Response) =>{
        const response = await CallService.getToken(req.userId ? req.userId : '');
        return res.status(response.code).json(response);
   }

   makeCall = async (req:RequestCustom, res:Response) =>{
        // const response = await CallService.getToken(req.userId ? req.userId : '');
        // return res.status(response.code).json(response);

        const response = await CallService.makeCall(req);
        console.log(response.toString());
        res.set('Content-Type', 'text/xml');
        res.send(response.toString());
   }
}

export default new CallController();