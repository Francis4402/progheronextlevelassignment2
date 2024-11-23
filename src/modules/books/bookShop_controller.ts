import { Request, Response } from 'express';
import { BookShopServices } from './bookShop_services';
import { bookValidationSchema } from './bookShop_zodValidation';

const storeBooks = async (req: Request, res: Response) => {
  try {
    const { books: bookData } = req.body;

    const zodparseData = bookValidationSchema.parse(bookData);

    const result = await BookShopServices.storeBooksIntoDB(zodparseData);

    res.status(200).json({
      success: true,
      message: 'Books added successfully',
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

const getBooks = async (req: Request, res: Response) => {
    try {
        const result = await BookShopServices.getBooksFromDB();

        res.status(200).json({
            success: true,
            message: 'Books fetched successfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message || 'something went wrong',
            error: error,
        })
    }
}

export const BookShopController = { storeBooks , getBooks};
