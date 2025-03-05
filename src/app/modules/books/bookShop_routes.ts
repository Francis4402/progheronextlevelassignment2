import express, { NextFunction, Request, Response } from 'express';
import { BookShopController } from './bookShop_controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Authentications/User/user_constant';
import { upload } from '../../utils/sendImagetocloud';



const router = express.Router();

router.post('/', upload.single('booksImage'), (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
}, auth(USER_ROLE.admin), BookShopController.storeBooks);

router.get('/', BookShopController.getAllBooks);

router.get('/:productId', BookShopController.getBooksById);

router.put('/:productId', upload.single('booksImage'), (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
}, auth(USER_ROLE.admin), BookShopController.updateBooksById);

router.delete('/:productId', auth(USER_ROLE.admin), BookShopController.deleteBooksById);

export const BookShopRoutes = router;
