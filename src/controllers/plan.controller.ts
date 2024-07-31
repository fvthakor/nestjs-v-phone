import {Request, Response } from "express";
import { PlanService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class PlanController{
    constructor(){
        
    }

    create = async(req: Request, res: Response) => {
        const response = await PlanService.create(req.body);
        return res.status(response.code).json(response);
	}

    getOne = async(req:Request, res:Response) => {
        const response = await PlanService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async(req:Request, res:Response) => {
        const response = await PlanService.getAll();
        return res.status(response.code).json(response);
    }

    update = async(req:Request, res:Response) => {
        const response = await PlanService.update(req.params.id, req.body);
        return res.status(response.code).json(response);
    }
    
    delete = async(req:Request, res:Response) => {
        const response = await PlanService.delete(req.params.id);
        return res.status(response.code).json(response);
    }

    me= async (req:RequestCustom, res:Response) => {
        const response = await PlanService.getOne(req.userId ? req.userId : '');
        return res.status(response.code).json(response);
    }
}

export default new PlanController();