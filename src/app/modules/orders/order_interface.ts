import { Model } from 'mongoose';

export type Order = {
  product: string;
  quantity: number;
  totalPrice: number;
};

export type OrderMethods = {
  isOrderExists(id: string): Promise<Order | null>;
};

export type OrderModel = Model<Order, unknown, OrderMethods>;
