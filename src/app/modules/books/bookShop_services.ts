/* eslint-disable @typescript-eslint/no-explicit-any */

import { Types } from 'mongoose';
import { TBook } from './bookShop_interfaces';
import { BooksModel } from './models/bookShop_Models';
import { sendImageToCloudinary } from '../../utils/sendImagetocloud';

const storeBooksIntoDB = async (file:any, payload: Partial<TBook>): Promise<TBook> => {
  
  const imageName = `${payload?.title}`;

  const path = file?.path;

  const ImageUrl = await sendImageToCloudinary(imageName, path);

  if (ImageUrl) {
    payload.bookImage = ImageUrl;
  } else {
    console.log('Image upload failed, profileImage will not be set.');
  }

  // Save to the database
  const result = await BooksModel.create(payload);

  return result;
};

const getBooksFromDB = async (searchTerm: string) => {
  try {
    if (searchTerm) {
      return await BooksModel.find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      });
    } else {
      return await BooksModel.find();
    }
  } catch (error) {
    console.error('Error fetching books by search term:', error);
    throw new Error('Failed to fetch books by search term');
  }
};

const getBooksByIdFromDB = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);

    const result = await BooksModel.aggregate([{ $match: { _id: objectId } }]);

    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateBooksByIdFromDB = async (
  id: string,
  payload: Partial<TBook>, file: any
): Promise<TBook | null> => {
  try {
    const objectId = new Types.ObjectId(id);

    const imageName = `${payload?.title}`;

    const path = file?.path;

    const ImageUrl = await sendImageToCloudinary(imageName, path);

    if (ImageUrl) {
      payload.bookImage = ImageUrl;
    } else {
      console.log('Image upload failed, profileImage will not be set.');
    }

    const result = await BooksModel.findByIdAndUpdate(
      objectId,
      { $set: payload },
      { new: true } 
    );

    if (!result) {
      throw new Error('Book not found');
    }

    return result;
  } catch (error) {
    console.error('Error updating book:', error);
    throw new Error('Failed to update book');
  }
};

const deleteBooksByIdFromDB = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);

    const result = await BooksModel.deleteOne({ _id: objectId });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const BookShopServices = {
  storeBooksIntoDB,
  getBooksFromDB,
  getBooksByIdFromDB,
  deleteBooksByIdFromDB,
  updateBooksByIdFromDB,
};
