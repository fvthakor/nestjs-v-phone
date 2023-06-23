import {Request} from 'express';
import { JwtPayload } from './JwtPayload.interface';

export default interface RequestCustom extends Request {
    userId?:string,
    roleId?:string, 
}