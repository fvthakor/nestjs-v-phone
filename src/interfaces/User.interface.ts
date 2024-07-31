
export interface UserModel {
    name: string,
    email: string,
    password?: string,
    number?: string,
    role?: 'admin | user' | 'super-admin',
    isProfileUpdate: boolean
};