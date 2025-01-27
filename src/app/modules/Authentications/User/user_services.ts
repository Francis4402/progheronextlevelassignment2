/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const UserServices = {
    createUserIntoDB, getUsersFromDB
}