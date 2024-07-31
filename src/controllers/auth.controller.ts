import {Request, Response } from "express";
import { AuthService } from "../services";
import RequestCustom from "../interfaces/RequestCustom.interface";

class AuthController{
    constructor(){
        
    }

    login = async (req: Request, res:Response) =>{
        const response = await AuthService.login(req.body, res);
        return res.status(response.code).json(response);
    }

    register = async (req: Request, res:Response) => {
        const response = await AuthService.register(req.body);
        return res.status(response.code).json(response);
    }

    logout = async (req: RequestCustom, res:Response) =>{
        const response = await AuthService.logout(req.userId ? req.userId : '', res);
        return res.status(response.code).json(response);
    }

    superAdminlogin = async (req: Request, res:Response) =>{
        const response = await AuthService.superAdminlogin(req.body, res, 'super-admin');
        return res.status(response.code).json(response);
    }

    adminlogin = async (req: Request, res:Response) =>{
        const response = await AuthService.adminlogin(req.body, res, 'admin');
        return res.status(response.code).json(response);
    }
}

export default new AuthController();