import { model, Schema } from 'mongoose';
import { Order, OrderModel } from '../order_interface';

const orderSchema = new Schema<Order, OrderModel>(
  {
    product: { type: String, required: [true, 'Product is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    totalPrice: { type: Number, required: [true, 'TotalPrice is required'] },
  },
  { timestamps: true },
);

orderSchema.methods.isOrderExists = async function (id: string) {
  const existingOrder = await OrdersModel.findOne({ id: id });
  return existingOrder;
};


export const OrdersModel = model<Order, OrderModel>('Order', orderSchema);
