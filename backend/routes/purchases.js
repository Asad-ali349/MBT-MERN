import express from 'express';
import { CreatePurchase, GetAllPurchases, GetSinglePurchase, UpdatePurchase, DeletePurchase } from '../controllers/purchases.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', CreatePurchase);
router.get('/', GetAllPurchases);
router.get('/:purchaseId', GetSinglePurchase);
router.patch('/:purchaseId', UpdatePurchase);
router.delete('/:purchaseId', DeletePurchase);

export default router; 