import {Request} from 'express';
import { JwtPayload } from './JwtPayload.interface';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export default interface RequestCustom extends Request {
    userId?:string,
    roleId?:string, 
    io?:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
}