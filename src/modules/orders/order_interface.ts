import { Model } from 'mongoose';

export type Order = {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderMethods = {
  isOrderExists(id: string): Promise<Order | null>;
};

export type OrderModel = Model<Order, unknown, OrderMethods>;
