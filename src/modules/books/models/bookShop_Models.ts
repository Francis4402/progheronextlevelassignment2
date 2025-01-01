import { model, Schema } from 'mongoose';
import { Book, BookShopModel } from '../bookShop_interfaces';

const bookSchema = new Schema<Book, BookShopModel>(
  {
    product_id: { type: Number, required: [true, 'Product_id is required'] },
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      unique: true,
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

bookSchema.pre('save', async function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const BooksModel = model<Book, BookShopModel>('Book', bookSchema);
