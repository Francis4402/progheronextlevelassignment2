/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";
import config from "../../../config";
import { sendImageToCloudinary } from "../../../utils/sendImagetocloud";
import { TUser } from "./user_interface";
import { User } from "./user_model";
import bcrypt from "bcrypt";



export const createUserIntoDB = async (file: any | undefined, payload: Partial<TUser>): Promise<TUser> => {
    try {
        payload.password = payload.password || config.default_pass;
        payload.role = payload.role || "user";

        
        if (!file || !file.buffer) {
            throw new Error('No file provided or file is empty');
        }

        const imageName = payload.name?.replace(/\s+/g, '_') || `user_${Date.now()}`;
        const imageUrl = await sendImageToCloudinary(imageName, file.buffer);

        if (imageUrl && imageUrl.secure_url) {
            payload.profileImage = imageUrl.secure_url;
        } else {
            console.warn('Image upload failed, profileImage will not be set.');
        }

        // Save user to database
        const result = await User.create(payload);
        return result;
    } catch (error) {
        console.error('Error creating user in DB:', error);
        throw error;
    }
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

export const updateProfilesFromDB = async (
    id: string,
    payload: Partial<TUser>,
    file: Express.Multer.File | undefined
  ): Promise<TUser | null> => {
    try {
      const objectId = new Types.ObjectId(id);
  

      if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds));
      }

      if (file && file.buffer) {
        const imageName = payload.name?.replace(/\s+/g, "_") || `user_${Date.now()}`;
        const imageUrl = await sendImageToCloudinary(imageName, file.buffer);
  
        if (imageUrl && imageUrl.secure_url) {
          payload.profileImage = imageUrl.secure_url;
        } else {
          console.warn("Image upload failed, profileImage will not be updated.");
        }
      }
  
      const result = await User.findByIdAndUpdate(objectId, { $set: payload }, { new: true });
  
      if (!result) {
        throw new Error("User not found");
      }
  
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  };

export const UserServices = {
    createUserIntoDB, getUsersFromDB, updateProfilesFromDB, getUserByIDDB
}