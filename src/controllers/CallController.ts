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
}

export default new CallController();