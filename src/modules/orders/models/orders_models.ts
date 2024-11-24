import { model, Schema } from 'mongoose';
import { Order, OrderModel } from '../order_interface';

const orderSchema = new Schema<Order, OrderModel>(
  {
    email: { type: String, required: [true, 'Email is required'] },
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

orderSchema.pre('save', async function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const OrdersModel = model<Order, OrderModel>('Order', orderSchema);
