import { RoleModel } from "./Role.interface";

export interface JwtPayload {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    RoleId: number,
    role: RoleModel
}