

import { Types } from 'mongoose';
import { TBook } from './bookShop_interfaces';
import { BooksModel } from './models/bookShop_Models';
import { sendImageToCloudinary } from '../../utils/sendImagetocloud';
import { v2 as cloudinary } from 'cloudinary';


export const storeBooksIntoDB = async (file: Express.Multer.File | undefined, payload: Partial<TBook>): Promise<TBook> => {
  try {
      if (!file || !file.buffer) {
          throw new Error('No file provided');
      }

      const imageName = payload.title?.replace(/\s+/g, '_') || `book_${Date.now()}`;
      const uploadResult = await sendImageToCloudinary(imageName, file.buffer);

      if (uploadResult && uploadResult.secure_url) {
          payload.bookImage = uploadResult.secure_url;
      } else {
          console.warn('Image upload failed, bookImage will not be set.');
      }

      // Save to database
      const result = await BooksModel.create(payload);
      return result;
  } catch (error) {
      console.error('Error storing book into DB:', error);
      throw error;
  }
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

export const updateBooksByIdFromDB = async (id: string, payload: Partial<TBook>, file: Express.Multer.File | undefined): Promise<TBook | null> => {
  try {
    const objectId = new Types.ObjectId(id);

    // If a file is provided, upload to Cloudinary
    if (file && file.buffer) {
      const imageName = payload.title?.replace(/\s+/g, '_') || `book_${Date.now()}`;
      const imageUrl = await sendImageToCloudinary(imageName, file.buffer);

      if (imageUrl && imageUrl.secure_url) {
        payload.bookImage = imageUrl.secure_url;
      } else {
        console.warn('Image upload failed, bookImage will not be updated.');
      }
    }

    // Update book in the database
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

const deleteBooksByIdFromDB = async (id: string): Promise<TBook> => {
  try {
    const objectId = new Types.ObjectId(id);

    // First, find the book and get the public_id for the image
    const book = await BooksModel.findById(objectId);
    
    if (!book) {
      throw new Error('Book not found');
    }

    // If the book has an image, delete it from Cloudinary
    if (book.bookImage) {
      const imageName = book.bookImage.split('/').pop()?.split('.')[0]; // Get the public_id from the URL (filename part before the extension)
      
      if (imageName) {
        await cloudinary.uploader.destroy(imageName, (error, result) => {
          if (error) {
            console.error('Error deleting image from Cloudinary:', error);
          } else {
            console.log('Image deleted from Cloudinary:', result);
          }
        });
      }
    }

    // Delete the book from the database
    const result = await BooksModel.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      throw new Error('Failed to delete book');
    }

    return book; // Return the book object instead of the DeleteResult
  } catch (error) {
    console.error('Error deleting book:', error);
    throw new Error('Failed to delete book');
  }
};

export const BookShopServices = {
  storeBooksIntoDB,
  getBooksFromDB,
  getBooksByIdFromDB,
  deleteBooksByIdFromDB,
  updateBooksByIdFromDB,
};
