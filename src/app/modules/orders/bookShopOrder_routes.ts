import express from 'express';
import { OrderController } from './orders_controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Authentications/User/user_constant';

const router = express.Router();

router.post('/', auth([USER_ROLE.admin, USER_ROLE.user]), OrderController.storeOrders);

router.get('/revenue', auth([USER_ROLE.admin]), OrderController.calculatedOrders);

router.get('/', auth([USER_ROLE.admin, USER_ROLE.user]), OrderController.getAllOrders);

export const OrderRoutes = router;
