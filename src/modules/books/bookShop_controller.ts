import { Request, Response } from 'express';
import { BookShopServices } from './bookShop_services';
import { bookValidationSchema } from '../zodValidations/zodValidation';

const storeBooks = async (req: Request, res: Response) => {
  try {
    const { books: bookData } = req.body;

    const zodparseData = bookValidationSchema.parse(bookData);

    const result = await BookShopServices.storeBooksIntoDB(zodparseData);

    res.status(200).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'something went wrong',
      error: error,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
    try {

        const searchTerm = req.query.searchTerm as string;

        const result = await BookShopServices.getBooksFromDB(searchTerm);

        res.status(200).json({
            status: true,
            message: 'Books retrieved successfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: (error as Error).message || 'something went wrong',
            error: error,
        })
    }
};

const getBooksById = async (req: Request, res: Response) => {
    try {
        const {productId: id} = req.params;
        const result = await BookShopServices.getBooksByIdFromDB(id);

        res.status(200).json({
            status: true,
            message: 'Books retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: (error as Error).message || 'something went wrong',
            error: error,
        })
    }
};

const updateBooksById = async (req: Request, res: Response) => {
    try {
        const {productId: id} = req.params;
        const {books} = req.body;

        const result = await BookShopServices.updateBooksByIdFromDB(id, books);

        res.status(200).json({
            status: true,
            message: 'Books updated successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: (error as Error).message || 'something went wrong',
            error: error,
        })
    }
};

const deleteBooksById = async (req: Request, res: Response) => {
    try {
        const {productId: id} = req.params;
        const result = await BookShopServices.deleteBooksByIdFromDB(id);

        res.status(200).json({
            status: true,
            message: 'Books retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: (error as Error).message || 'something went wrong',
            error: error,
        })
    }
};

export const BookShopController = { storeBooks , getAllBooks, getBooksById, updateBooksById, deleteBooksById };
