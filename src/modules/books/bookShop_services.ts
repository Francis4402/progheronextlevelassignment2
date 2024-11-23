import { Types } from 'mongoose';
import { Books } from '../bookShopModels';
import { Book } from './bookShop_interfaces';

const storeBooksIntoDB = async (book: Book) => {

  const bookWithTimeStamps = {
    ...book,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const bookData = new Books(bookWithTimeStamps);

  if (await bookData.isUserExists(book.title)) {
    throw new Error('Book already exists');
  }

  const result = await bookData.save();

  return result;
};

const getBooksFromDB = async (searchTerm: string) => {
  try {
    const result = await Books.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    return result;
  } catch (error) {
    console.error('Error fetching books by search term:', error);
    throw new Error('Failed to fetch books by search term');
  }
};


const getBooksByIdFromDB = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);

    const result = await Books.aggregate([{$match: {_id: objectId}}]);

    return result;

  } catch (error) {
    console.log(error);
  }
};

const updateBooksByIdFromDB = async (
  id: string,
  updates: Partial<{
    title: string;
    author: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
  }>
) => {
  try {
    const objectId = new Types.ObjectId(id);

    const result = await Books.updateOne(
      { _id: objectId },
      { $set: updates }
    );

    return result;
  } catch (error) {
    console.error('Error updating book:', error);
    throw new Error('Failed to update book');
  }
};


const deleteBooksByIdFromDB = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);

    const result = await Books.deleteOne({_id: objectId});

    return result;
  } catch(error) {
    console.log(error);
  }
}

export const BookShopServices = { storeBooksIntoDB, getBooksFromDB, getBooksByIdFromDB, deleteBooksByIdFromDB, updateBooksByIdFromDB };
