import express from 'express';
import { OrderController } from './orders/orders_controller';

const router = express.Router();

router.post('/', OrderController.storeOrders);

router.get('/revenue', OrderController.calculatedOrders);

router.get('/', OrderController.getAllOrders);

export const OrderRoutes = router;
