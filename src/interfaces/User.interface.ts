
export interface UserModel {
    name: string,
    email: string,
    password: string,
    role: 'admin | employee | manager',
};