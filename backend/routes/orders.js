import express from 'express';
import auth from '../middlewares/auth.js';
import { CreateOrder } from '../controllers/orders.js';




const router= express.Router();

router.post('/',auth,CreateOrder);


export default router;