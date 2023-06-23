import {Request, Response } from "express";
import { AuthService } from "../services";

class AuthController{
    constructor(){
        
    }

    login = async (req: Request, res:Response) =>{
        const response = await AuthService.login(req.body);
        return res.status(response.code).json(response);
    }

    register = async (req: Request, res:Response) => {
        const response = await AuthService.register(req.body);
        return res.status(response.code).json(response);
    }
}

export default new AuthController();