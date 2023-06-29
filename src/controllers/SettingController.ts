import {Request, Response } from "express";
import { SettingService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class SettingController{
    constructor(){
        
    }
    
    create = async(req: RequestCustom, res: Response) => {
        const response = await SettingService.create({...req.body, user: req.userId});
        return res.status(response.code).json(response);
	}

    getOne = async(req:Request, res:Response) => {
        const response = await SettingService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }
    getByUser = async (req:RequestCustom, res:Response) => {
        const response = await SettingService.getByUser(req.userId ? req.userId : '');
        return res.status(response.code).json(response);
    }

    getAll = async(req:Request, res:Response) => {
        const response = await SettingService.getAll();
        return res.status(response.code).json(response);
    }

    update = async(req:Request, res:Response) => {
        const response = await SettingService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }
    
    delete = async(req:Request, res:Response) => {
        const response = await SettingService.delete(+req.params.id);
        return res.status(response.code).json(response);
    }
}

export default new SettingController();