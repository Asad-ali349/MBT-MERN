import express from 'express';

import auth from '../middlewares/auth.js';
import multer from 'multer';
import { GetCategoryDetail, GetCategories, UpdateCategory, createCategory, DeleteCategory } from '../controllers/categories.js';
import { DeleteProduct, GetProducts, UpdateProduct, createProducts } from '../controllers/products.js';

const uploadfile=multer({
  storage:multer.diskStorage({
    destination:function(req,file,callback){  
      callback(null,'./uploads');
    },
    filename:function(req,file,callback){
      callback(null,Date.now()+"-"+file.originalname)
    }
  })
}).single('image');




const router= express.Router();

router.post('/',uploadfile,createProducts);
router.get('/',GetProducts);
// router.get('/:id',auth,GetProductDetail);
router.patch('/:id',uploadfile,UpdateProduct);
router.delete('/:id',DeleteProduct);


export default router;