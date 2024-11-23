import { Model, ObjectId } from "mongoose";


export interface IProduct {
    _id: ObjectId;
    title: string;
    price: number;
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


export type OrderShopMethods = {
    isOrderExists(id: string): Promise<Order | null>;
};

export type OrderShopModel = Model<Order, unknown, OrderShopMethods>;