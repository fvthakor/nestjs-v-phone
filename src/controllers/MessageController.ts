import {Request, Response } from "express";
import { MessageService, } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class MessageController{
    constructor(){
        
    }

    sendMessage = async (req: RequestCustom, res: Response) => {
        const response = await MessageService.sendMessage({...req.body, user: req.userId ? req.userId : ''});
        return res.status(response.code).json(response);
    }

    receiveMessage = async (req: Request, res: Response) => {
        const response = await MessageService.receiveMessage(req);
        console.log(response.toString());
        res.set('Content-Type', 'text/xml');
        res.send(response.toString());
    }

    getMessages = async (req:RequestCustom, res:Response) => {
        const response = await MessageService.getMessages(req.body.number, req.userId ? req.userId : '');
        return res.status(response.code).json(response);
    }

    numberList = async (req:RequestCustom, res: Response) => {
        const response = await MessageService.numberList(req);
        return res.status(response.code).json(response);
    }

    getAll = async(req:Request, res:Response) => {
        const response = await MessageService.getAll(req);
        return res.status(response.code).json(response);
    }
    
    delete = async(req:Request, res:Response) => {
        const response = await MessageService.delete(req.params.id);
        return res.status(response.code).json(response);
    }
}

export default new MessageController();