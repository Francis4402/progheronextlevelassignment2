import { Request, Response } from 'express';
import { BookShopServices } from './bookShop_services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { httpStatus } from '../../config/status';
import { bookValidationSchema } from '../zodValidations/zodValidation';


const storeBooks = catchAsync(async (req, res) => {

  console.log(req.file);
  console.log(req.body);

  const { product_id, title, author, price, category, description, quantity, inStock } = req.body;

  const payload = {
    product_id,
    title,
    author,
    price,
    category,
    description,
    quantity,
    inStock,
  };

  const validpayload = bookValidationSchema.parse(payload);

  const result = await BookShopServices.storeBooksIntoDB(req.file, validpayload);

  sendResponse(res, {
    statusCode: httpStatus.SUCCESS,
    success: true,
    message: 'Book data Stored successfully',
    data: {
      book: result,
      file: req.file,
    },
  });
});



const getAllBooks = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    const result = await BookShopServices.getBooksFromDB(searchTerm);

    res.status(200).json({
      message: 'Books retrieved successfully',
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

const getBooksById = async (req: Request, res: Response) => {
  try {
    const { productId: id } = req.params;
    const result = await BookShopServices.getBooksByIdFromDB(id);

    res.status(200).json({
      message: 'Books retrieved successfully',
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

const updateBooksById = async (req: Request, res: Response) => {
  try {
    const { productId: id } = req.params;
    const { books } = req.body;

    const result = await BookShopServices.updateBooksByIdFromDB(id, books);

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

const deleteBooksById = async (req: Request, res: Response) => {
  try {
    const { productId: id } = req.params;
    const result = await BookShopServices.deleteBooksByIdFromDB(id);

    res.status(200).json({
      message: 'Book deleted successfully',
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

export const BookShopController = {
  storeBooks,
  getAllBooks,
  getBooksById,
  updateBooksById,
  deleteBooksById,
};
