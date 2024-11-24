import { Request, Response } from 'express';
import { orderValidationSchema } from '../zodValidations/zodValidation';
import { OrderServices } from './orders_services';

const storeOrders = async (req: Request, res: Response) => {
  try {
    const { orders: orderData } = req.body;

    const zodparseData = orderValidationSchema.parse(orderData);

    const order = await OrderServices.storeOrdersIntoDB(zodparseData, res);

    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message || 'Failed to create order',
      status: false,
      error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { totalRevenue } = await OrderServices.getOrdersFromDB();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message || 'something went wrong',
      status: false,
      error,
    });
  }
};

const updateBooksById = async (req: Request, res: Response) => {
  try {
    const { productId: id } = req.params;
    const { books } = req.body;

    const result = await OrderServices.updateProductsOrders(id, books);

    res.status(200).json({
      message: 'Books updated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message || 'something went wrong',
      status: false,
      error,
    });
  }
};

export const OrderController = { storeOrders, updateBooksById, getAllOrders };
