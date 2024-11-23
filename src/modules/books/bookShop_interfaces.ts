import { Model, ObjectId } from "mongoose";

export interface IProduct {
    _id: ObjectId;
    title: string;
    price: number;
}

export type Book = {
    title: string;
    author: string;
    price: number;
    category: "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious";
    description: string;
    quantity: number;
    inStock: boolean;
}

export type Order = {
    _id: ObjectId;
    email: string;
    product: ObjectId | IProduct;
    quantity: number;
    totalPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export type BookShopMethods = {
    isUserExists(id: string): Promise<Book | null>;
};

export type OrderShopMethods = {
    isOrderExists(id: string): Promise<Order | null>;
}


export type BookShopModel = Model<Book, BookShopMethods>;

export type OrderShopModel = Model<Order, OrderShopMethods>;