import { Model } from 'mongoose';


export type Book = {
  title: string;
  author: string;
  price: number;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};


export type BookShopMethods = {
  isUserExists(id: string): Promise<Book | null>;
};


export type BookShopModel = Model<Book, unknown, BookShopMethods>;
