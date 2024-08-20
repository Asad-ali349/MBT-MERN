import express from 'express';

import auth from '../middlewares/auth.js';
import multer from 'multer';
import { GetCategoryDetail, GetCategories, UpdateCategory, createCategory, DeleteCategory } from '../controllers/categories.js';

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

router.post('/',uploadfile,createCategory);
router.get('/',GetCategories);
router.get('/:id',GetCategoryDetail);
router.patch('/:id',uploadfile,UpdateCategory);
router.delete('/:id',DeleteCategory);


export default router;