import { Types } from 'mongoose';
import { OrdersModel } from './models/orders_models';
import { Order } from './order_interface';
import { BooksModel } from '../books/models/bookShop_Models';
import { Response } from 'express';
import { TUser } from '../Authentications/User/user_interface';
import { orderUtils } from './order_utils';




const storeOrdersIntoDB = async (order: Order, user: TUser, res: Response, client_ip: string) => {
    
  const book = await BooksModel.findById(order.product);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found", status: false });
    }

    if (book.quantity < order.quantity) {
      return res.status(400).json({ message: "Insufficient stock available", status: false });
    }

    const remainingQuantity = book.quantity - order.quantity;

    await updateProductsOrders(order.product.toString(), {
      quantity: remainingQuantity,
      inStock: remainingQuantity > 0,
    });

    if (!order.totalPrice || order.totalPrice <= 0) {
      return res.status(400).json({ message: "Invalid order total price", status: false });
    }

    
    const orderData = await OrdersModel.create({
      user,
      product: order.product,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
    });

    console.log('orderData', orderData);

    const shurjopayPayload = {
      amount: orderData.totalPrice.toString(),
      order_id: orderData._id,
      currency: "BDT",
      customer_name: user.name,
      customer_address: user.address,
      customer_email: user.email,
      customer_phone: user.phone,
      customer_city: user.city,
      client_ip,
    };

    console.log("Payload:", shurjopayPayload);

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);


    if (payment?.transactionStatus) {
    order = await orderData.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};




const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrdersModel.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};


const getAllOrdersFromDB = async () => {
  const orders = await OrdersModel.find();

  return orders;
}

const getOrdersFromDB = async () => {
  try {
    const revenueData = await OrdersModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ['$totalPrice', '$quantity'] },
          },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    return { totalRevenue };
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    throw new Error('Failed to fetch total revenue');
  }
};

const updateProductsOrders = async (
  id: string,
  updates: Partial<{
    quantity: number;
    inStock: boolean;
  }>,
) => {
  try {
    const objectId = new Types.ObjectId(id);

    const result = await BooksModel.updateOne(
      { _id: objectId },
      { $set: updates },
    );

    return result;
  } catch (error) {
    console.error('Error updating quantity & instock:', error);
    throw new Error('Failed to update book');
  }
};

export const OrderServices = {
  storeOrdersIntoDB,
  updateProductsOrders,
  getOrdersFromDB,
  getAllOrdersFromDB,
  verifyPayment
};
