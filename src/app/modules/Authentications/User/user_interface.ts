import { Model } from "mongoose";
import { USER_ROLE } from "./user_constant";


export type TUser = {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    phone: string;
    address: string;
    city: string;
    gender: string;
    dateofbirth: string;
    password: string;
    role: 'admin' | 'user';
    isBlocked: boolean;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(email: string): Promise<TUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;