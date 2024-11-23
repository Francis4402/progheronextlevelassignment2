import express from 'express';
import { BookShopController } from './books/bookShop_controller';

const router = express.Router();

router.post('/create', BookShopController.storeBooks);

router.get('/', BookShopController.getBooks);

export const BookShopRoutes = router;