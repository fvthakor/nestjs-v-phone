import {Request, Response } from "express";
import { NumberService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class NumberController{
    constructor(){
        
    }

    getNumbers = async (req: Request, res: Response) => {
        const response = await NumberService.getNumbers(req.body);
        return res.status(response.code).json(response);
    }

    purchaseNumbers = async (req: RequestCustom, res: Response) => {
        const response = await NumberService.purchaseNumbers(req.body.phoneNumbers, req.userId ? req.userId : '');
        // return res.status(response.code).json(response);
    }

    getOne = async(req:Request, res:Response) => {
        const response = await NumberService.getOne(req.params.id);
        return res.status(response.code).json(response);
    }

    getAll = async(req:Request, res:Response) => {
        const response = await NumberService.getAll(req);
        return res.status(response.code).json(response);
    }
    
    delete = async(req:Request, res:Response) => {
        const response = await NumberService.delete(+req.params.id);
        return res.status(response.code).json(response);
    }
}

export default new NumberController();