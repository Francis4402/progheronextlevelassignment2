import { Books } from '../bookShopModels';
import { Book } from './bookShop_interfaces';

const storeBooksIntoDB = async (book: Book) => {
  const bookData = new Books(book);

  if (await bookData.isUserExists(book.title)) {
    throw new Error('Book already exists');
  }

  const result = await bookData.save();

  return result;
};

const getBooksFromDB = async () => {
  const result = await Books.find();
  return result;
}

export const BookShopServices = { storeBooksIntoDB, getBooksFromDB };
