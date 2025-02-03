import { Model } from 'mongoose';

export type TBook = {
  product_id: string;
  title: string;
  bookImage?: string;
  author: string;
  price: number;
  category: 'Fiction' | 'Science' | 'SoftwareDevelopment' | 'Poetry' | 'Story';
  description: string;
  quantity: number;
  inStock: boolean;
};

export type BookShopMethods = {
  isUserExists(id: string): Promise<TBook | null>;
};

export type BookShopModel = Model<TBook, unknown, BookShopMethods>;
