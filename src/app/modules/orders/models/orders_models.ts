import { model, Schema } from 'mongoose';
import { Order, OrderModel } from '../order_interface';


const orderSchema = new Schema<Order, OrderModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    totalPrice: { type: Number, required: [true, 'TotalPrice is required'] },
    status: { type: String, enum: ["Pending" , "Paid" , "Shipped" , "Completed" , "Cancelled"]},
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true },
);

orderSchema.methods.isOrderExists = async function (id: string) {
  const existingOrder = await OrdersModel.findOne({ id: id });
  return existingOrder;
};


export const OrdersModel = model<Order, OrderModel>('Order', orderSchema);
