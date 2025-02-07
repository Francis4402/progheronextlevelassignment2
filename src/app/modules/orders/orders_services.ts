import { Types } from 'mongoose';
import { OrdersModel } from './models/orders_models';
import { Order } from './order_interface';
import { BooksModel } from '../books/models/bookShop_Models';
import { Response } from 'express';



const storeOrdersIntoDB = async (order: Order, res: Response) => {
  const orderWithTimeStamps = {
    ...order,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const orderData = new OrdersModel(orderWithTimeStamps);

  const book = await BooksModel.findById(order.product);

  if (!book) {
    return res.status(404).json({ message: 'Book not found', status: false });
  }

  if (book.quantity < order.quantity) {
    return res
      .status(400)
      .json({ message: 'Insufficient stock available', status: false });
  }


  const result = await orderData.save();

  const remainingQuantity = book.quantity - order.quantity;

  await updateProductsOrders(order.product, {
    quantity: remainingQuantity,
    inStock: remainingQuantity > 0,
  });

  return result;
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
};
