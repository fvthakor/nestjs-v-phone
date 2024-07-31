import { NextFunction, Response } from "express";
import * as jwt from 'jsonwebtoken'
import RequestCustom from "../interfaces/RequestCustom.interface";

export const CheckAuth = async (req:RequestCustom, res:Response, next:NextFunction) => {
    
        try {
            let authHeader:any = req.headers["superadmin"];
            // if(!authHeader){
            //     authHeader = req.cookies['loginToken']
            // }
            if(!authHeader)
            return res.status(401).json({code:401, message: 'Please provide auth token!', data: null})
            const accessToken = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'drc'
            const decoded:any = await jwt.verify(authHeader, accessToken);
            if(decoded){
                //console.log('decode', decoded);
                req.userId = decoded._id;
                return next();
            }else{
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorize access!',
                    data:null
                })
            }
        }catch (error) {
            return res.status(500).json({
                code: 500,
                message: 'Request failed due to an internal error!',
                data:null
            })
        }
    
}
