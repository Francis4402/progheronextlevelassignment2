import { model, Schema } from 'mongoose';
import { BookShopModel, TBook } from '../bookShop_interfaces';


const bookSchema = new Schema<TBook, BookShopModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    bookImage: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    price: { type: Number, required: [true, 'Price is required'] },
    category: { type: String, required: [true, 'Category is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    inStock: { type: Boolean, required: [true, 'InStock is required'] },
  },
  { timestamps: true },
);

bookSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await BooksModel.findOne({ id: id });
  return existingUser;
};


export const BooksModel = model<TBook, BookShopModel>('Book', bookSchema);
