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

const getBooksFromDB = async () => {
  const result = await Books.find();
  return result;
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

const deleteBooksByIdFromDB = async (id: string) => {
  try {
    const objectId = new Types.ObjectId(id);

    const result = await Books.deleteOne({_id: objectId});

    return result;
  } catch(error) {
    console.log(error);
  }
}

export const BookShopServices = { storeBooksIntoDB, getBooksFromDB, getBooksByIdFromDB, deleteBooksByIdFromDB };
