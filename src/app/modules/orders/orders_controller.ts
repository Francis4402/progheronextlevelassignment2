import { Request, Response } from 'express';
import { OrderServices } from './orders_services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { httpStatus } from '../../config/status';



const storeOrders = catchAsync(async (req, res) => {

    const user = req.user;
    
    const order = await OrderServices.storeOrdersIntoDB(req.body, user, res, req.ip!);

    sendResponse(res, {
      statusCode: httpStatus.SUCCESS,
      success: true,
      message: 'Order Created successfully',
      data: order
    });
})

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDB();

    res.status(200).json({
      message: 'Orders retrieved successfully',
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
}

const calculatedOrders = async (req: Request, res: Response) => {
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


const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.SUCCESS,
    success: true,
    message: 'verified successfully',
    data: order
  });
});


export const OrderController = { storeOrders, updateBooksById, calculatedOrders, getAllOrders, verifyPayment };
