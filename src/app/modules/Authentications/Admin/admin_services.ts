import { Types } from "mongoose";
import { BooksModel } from "../../books/models/bookShop_Models";
import { User } from "../User/user_model";


const updateBlogUnpublishDB = async (id: string) => {
    try {
        const objectId = new Types.ObjectId(id);

        const result = await BooksModel.updateOne(
            {_id: objectId},
            {$set: {isPublished: false}}
        )

        return result;
    } catch (error) {
        console.error("Error blog isPublished status:", error);
        throw new Error("Failed to toggle blog isPublished status");
    }
}

const updateUserRolesDB = async (id: string) => {
    try {
        const objectId = new Types.ObjectId(id);

        const result = await User.updateOne(
            {_id: objectId},
            {$set: {role: 'admin'}}
        );

        return result;

    } catch (error) {
        console.error("Error changing user role:", error);
        throw new Error("Failed to change user role");
    }
}

const updateUserBlockedFromDB = async (id: string) => {
    try {
        const objectId = new Types.ObjectId(id);

        
        const result = await User.updateOne(
            { _id: objectId },
            { $set: { isBlocked: true } }
        );

        return result;
    } catch (error) {
        console.error("Error user blocked status:", error);
        throw new Error("Failed to toggle user blocked status");
    }
};

const deleteBlogIntoDB = async (id: string) => {
    try {
        const objectId = new Types.ObjectId(id);

        const result = await BooksModel.deleteOne({_id: objectId });

        return result;
    } catch (error) {
        console.log(error);
    }
}


export const adminServices = {
    updateUserBlockedFromDB, deleteBlogIntoDB, updateUserRolesDB, updateBlogUnpublishDB
}