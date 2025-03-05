import { Model } from 'mongoose';

export type Order = {
  user: string;
  product: string;
  quantity: number;
  totalPrice: number;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
};

export type OrderMethods = {
  isOrderExists(id: string): Promise<Order | null>;
};

export type OrderModel = Model<Order, unknown, OrderMethods>;
