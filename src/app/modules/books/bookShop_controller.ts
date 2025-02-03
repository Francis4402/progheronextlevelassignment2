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
    data: result
  });
});



const getAllBooks = catchAsync(async (req, res) => {

  const searchTerm = req.query.searchTerm as string;

    const result = await BookShopServices.getBooksFromDB(searchTerm);


    sendResponse(res, {
      statusCode: httpStatus.SUCCESS,
      success: true,
      message: 'Book data fetched successfully',
      data: result
    });
})

const getBooksById = catchAsync(async (req, res) => {
  const { productId: id } = req.params;
  const result = await BookShopServices.getBooksByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.SUCCESS,
    success: true,
    message: 'Book data fetched successfully',
    data: result
  });
})

const updateBooksById = catchAsync(async (req, res) => {
  const { productId: id } = req.params;
  
  const { product_id, title, author, price, category, description, quantity, inStock } = req.body;

  const payload = {
    product_id,title,author,price,category,description,quantity,inStock,
  };
  const result = await BookShopServices.updateBooksByIdFromDB(id, payload, req.file);

  sendResponse(res, {
    statusCode: httpStatus.SUCCESS,
    success: true,
    message: 'Book data updated successfully',
    data: result,
  });
})

const deleteBooksById = catchAsync(async (req, res) => {
  const { productId: id } = req.params;
  const result = await BookShopServices.deleteBooksByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.SUCCESS,
    success: true,
    message: 'Book data deleted successfully',
    data: result
  });
})

export const BookShopController = {
  storeBooks,
  getAllBooks,
  getBooksById,
  updateBooksById,
  deleteBooksById,
};
