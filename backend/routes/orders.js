import express from 'express';
import auth from '../middlewares/auth.js';
import { CreateOrder, GetAllOrders, GetProductStats, GetSingleOrder, UpdateOrder, UpdateOrderStatus } from '../controllers/orders.js';

const router = express.Router();

router.post('/',auth,CreateOrder)
router.get('/orderDetail/:orderId',auth,GetSingleOrder)
router.patch('/updateOrderStatus/:orderId',auth,UpdateOrderStatus)
router.get('/product-stats',GetProductStats)
router.get('/:orderType',auth,GetAllOrders)
router.patch('/:orderId',auth,UpdateOrder)
export default router;