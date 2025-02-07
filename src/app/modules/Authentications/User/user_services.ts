/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";
import config from "../../../config";
import { sendImageToCloudinary } from "../../../utils/sendImagetocloud";
import { TUser } from "./user_interface";
import { User } from "./user_model";


const createUserIntoDB = async (file: any, payload: Partial<TUser>): Promise<TUser> => {
    payload.password = payload.password || (config.default_pass as string);
  
    payload.role = payload.role || "user";

    const imageName = `${payload?.name}`;

    const path = file?.path;
    
    const profileImageUrl = await sendImageToCloudinary(imageName, path);
    
    if (profileImageUrl) {
        payload.profileImage = profileImageUrl;
    } else {
        console.log('Image upload failed, profileImage will not be set.');
    }
  
    const result = await User.create(payload);
  
    return result;
};

const getUsersFromDB = async () => {
    const result = await User.find();
    return result;
}

const getUserByIDDB = async (id: string) => {
    try {
        const objectId = new Types.ObjectId(id);

        const result = await User.aggregate([{ $match: {_id: objectId }}])

        return result;
    } catch (error) {
        console.log(error);
    }
}

const updateProfilesFromDB = async (id: string, payload: Partial<TUser>, file: any): Promise<TUser | null> => {
    try {
        const objectId = new Types.ObjectId(id);

        const imageName = `${payload?.name}`;

        const path = file?.path;

        const profileImageUrl = await sendImageToCloudinary(imageName, path);

        if (profileImageUrl) {
            payload.profileImage = profileImageUrl;
        }

        const result = await User.findByIdAndUpdate(
            objectId,
            { $set: payload },
            { new: true }
        );

        if (!result) {
            throw new Error('User not found');
        }

        return result;

    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
    }
}

export const UserServices = {
    createUserIntoDB, getUsersFromDB, updateProfilesFromDB, getUserByIDDB
}