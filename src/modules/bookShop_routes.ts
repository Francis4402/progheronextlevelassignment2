import express from 'express';
import { BookShopController } from './books/bookShop_controller';

const router = express.Router();

router.post('/', BookShopController.storeBooks);

router.get('/', BookShopController.getAllBooks);

router.get('/:productId', BookShopController.getBooksById);

router.delete('/:productId', BookShopController.deleteBooksById);


export const BookShopRoutes = router;