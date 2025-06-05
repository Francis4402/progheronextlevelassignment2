import { Router } from 'express';
import { customerController } from './customer_controller';


const router = Router();

// Define routes
router.get('/', customerController.getAll);

export default router;
