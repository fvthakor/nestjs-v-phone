import {Request, Response } from "express";
import { UserService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class UserController{
    constructor(){
        
    }

    create = async(req: Request, res: Response) => {
        const response = await UserService.create(req.body);
        return res.status(response.code).json(response);
	}

    getOne = async(req:Request, res:Response) => {
        const response = await UserService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async(req:Request, res:Response) => {
        const response = await UserService.getAll();
        return res.status(response.code).json(response);
    }

    update = async(req:Request, res:Response) => {
        const response = await UserService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }
    
    delete = async(req:Request, res:Response) => {
        const response = await UserService.delete(+req.params.id);
        return res.status(response.code).json(response);
    }

    me= async (req:RequestCustom, res:Response) => {
        const response = await UserService.getOne(req.userId ? req.userId : '');
        return res.status(response.code).json(response);
    }
}

export default new UserController();