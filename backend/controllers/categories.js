import Categories from "../models/categories.js";
import cloudinary from 'cloudinary';
import fs from 'fs';
import { addCategorySchema, updateCategorySchema } from "../Validations/index.js";
import Products from '../models/products.js';
import products from "../models/products.js";


export const createCategory= async (req, res)=>{   
    
    const {name}=req.body;
    const category=req.body;
    try{
        const { error, value } = addCategorySchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
       
        const existingCategory= await Categories.findOne({name});
        if (existingCategory)
            return res.status(400).json({ message:"Category already exits..."});

        if(req.file){
            if (req.file || Object.keys(req.file).length !== 0){
                const file = req.file; 
                // uploading image to cloudnary
                try{

                    await cloudinary.v2.uploader.upload(file.path, { folder: "Mithu_Categoryies", resource_type: 'raw' }, async (err, result) => {
                        if(err) throw err;
                        removeTmp(file.path)
                        category.image= { public_id: result.public_id, url: result.secure_url }
                    })
                }catch(error){
                    console.log(error)
                }
            }
        }
        const NewCategory= new Categories({...category});
        const savedCategory = await NewCategory.save();

        if (!savedCategory)
            return res.status(500).json({ message: "Unable to add Category." });
        
        return res.status(200).json({ message: 'Category Created Successfully.',category:savedCategory });

    }catch(error){
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating Catgory:', error);
        return res.status(500).json({ message: error });
    }
}

export const GetCategories=async(req, res)=>{  
    try{
        const categories= await Categories.find();
        return res.status(200).json(categories);
    }catch(error){  
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating category:', error);
        return res.status(500).json({ message: error });
    }

}

export const GetCategoryDetail=async(req, res)=>{ 
    const {id}=req.params;

    try{
        const category= await Categories.findOne({_id:id});
        const products=await Products.find({category_id:id}); 
        return res.status(200).json({category,products});
    }catch(error){  
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating category:', error);
        return res.status(500).json({ message: error });
    }
}

export const UpdateCategory=async(req, res)=>{
    const id=req.params.id;
    const category=req.body;
    
    try{
        
        const { error, value } = updateCategorySchema.validate(req.body);
        if (error) {
            // Return a 400 Bad Request response if validation fails
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingCategory=await Categories.findOne({
            _id:{$ne:id},
            name:category?.name
        });

        if (existingCategory)
            return res.status(400).json({ message:"Category already exit with given name..."});
        if(req.file){
            console.log(req.file)
            if (req.file || Object.keys(req.file).length !== 0){
                const file = req.file; 
                // uploading image to cloudnary
                try{
                    if(category.image!=null && category.image!=""){
                        const publicIdToDelete = fileData.path.public_id;
                        const respurse_deleted = await cloudinary.v2.api.delete_resources([publicIdToDelete],{ type: 'upload', resource_type: 'raw' });
                    }
                    await cloudinary.v2.uploader.upload(file.path, { folder: "Mithu_Categoryies", resource_type: 'raw' }, async (err, result) => {
                        if(err) throw err;
                        removeTmp(file.path)
                        category.image= { public_id: result.public_id, url: result.secure_url }
                    })
                }catch(error){
                    console.log(error)
                }
            }
        }
        if (category.image == "") {
            delete category.image;
        }
        const updatedCategory= await Categories.findByIdAndUpdate(
            id,
            category,
            {
                new:true
            }
        );

        return res.status(200).json({ message:"Category Updated Successfully...",category:updatedCategory});

    }catch(error){  
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating category:', error);
        return res.status(500).json({ message: error });
    }

}

export const DeleteCategory= async (req,res)=>{
    const {id} = req.params;
    try {
        const product=await products.find({category_id:id});
        if(product.length>0){
            return res.status(400).json({ message: "This categpory is used by any product..."}); 
        }
        const deleteCategory=await Categories.findOneAndDelete({_id:id});
        return res.status(200).json({ message: "Category Deleted Successfully"});
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ message: error });
    }

}
const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}





