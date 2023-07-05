import {Request, Response } from "express";
import { ContactService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class ContactController{
    constructor(){
        
    }
    
    create = async(req: RequestCustom, res: Response) => {
        const response = await ContactService.create({...req.body, user: req.userId});
        return res.status(response.code).json(response);
	}

    getOne = async(req:Request, res:Response) => {
        const response = await ContactService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }
    getAll = async (req:RequestCustom, res:Response) => {
        const response = await ContactService.getAll(req.userId ? req.userId : '');
        return res.status(response.code).json(response);
    }

    update = async(req:Request, res:Response) => {
        const response = await ContactService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }
    
    delete = async(req:Request, res:Response) => {
        const response = await ContactService.delete(+req.params.id);
        return res.status(response.code).json(response);
    }
}

export default new ContactController();