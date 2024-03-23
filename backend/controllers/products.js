import Products from '../models/products.js';
import { addProductSchema,updateProductSchema } from '../Validations/index.js';
import cloudinary from 'cloudinary';
import fs from 'fs';


export const createProducts=async (req,res)=>{
    const {name}=req.body;
    const product=req.body;
    try{
        const { error, value } = addProductSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
       
        const existingProduct= await Products.findOne({name});
        if (existingProduct)
            return res.status(400).json({ message:"Product already exits..."});

        if(req.file){
            console.log(req.file)
            if (req.file || Object.keys(req.file).length !== 0){
                const file = req.file; 
                // uploading image to cloudnary
                try{

                    await cloudinary.v2.uploader.upload(file.path, { folder: "Mithu_Products", resource_type: 'raw' }, async (err, result) => {
                        if(err) throw err;
                        removeTmp(file.path)
                        product.image= { public_id: result.public_id, url: result.secure_url }
                    })
                }catch(error){
                    console.log(error)
                }
            }
        }
        const NewProduct= new Products({...product});
        const savedProduct = await NewProduct.save();

        if (!savedProduct)
            return res.status(500).json({ message: "Unable to add Product." });
        
        return res.status(200).json({ message: 'Product Created Successfully.' });

    }catch(error){
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating Product:', error);
        return res.status(500).json({ message: error });
    }
}

export const GetProducts= async (req,res)=>{
    try {
        const products= await Products.find().populate('category_id');
        return res.status(200).json(products);
    } catch (error) {
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error fetching Product:', error);
        return res.status(500).json({ message: error });
    }
}

export const UpdateProduct=async(req, res)=>{
    const id=req.params.id;
    const product=req.body;
    
    try{
        
        const { error, value } = updateProductSchema.validate(req.body);
        if (error) {
            // Return a 400 Bad Request response if validation fails
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingProduct=await Products.findOne({
            _id:{$ne:id},
            name:product?.name
        });
        if (existingProduct)
            return res.status(400).json({ message:"Product already exit with given email..."});

        if(req.file){
            
            if (req.file || Object.keys(req.file).length !== 0){
                const file = req.file; 
                // uploading image to cloudnary
                try{
                    if(product.image!=null && product.image!=""){
                        console.log("product image is not null")
                        const publicIdToDelete = fileData.path.public_id;
                        const respurse_deleted = await cloudinary.v2.api.delete_resources([publicIdToDelete],{ type: 'upload', resource_type: 'raw' });
                    }
                    await cloudinary.v2.uploader.upload(file.path, { folder: "Mithu_Products", resource_type: 'raw' }, async (err, result) => {
                        if(err) throw err;
                        removeTmp(file.path)
                        product.image= { public_id: result.public_id, url: result.secure_url }
                    })
                }catch(error){
                    console.log(error)
                }
            }
        }


        if (product.image == "") {
            delete product.image;
        }
        const updatedProduct= await Products.findByIdAndUpdate(id,product,{new:true});

        return res.status(200).json({ message:"Product Updated Successfully..."});

    }catch(error){  
        // If an error occurs during the process, return a 500 status with the error message
        console.error('Error creating category:', error);
        return res.status(500).json({ message: error });
    }

}


export const DeleteProduct= async (req,res)=>{
    const {id} = req.params;

    try {
        const deleteProduct=await Products.findOneAndDelete({_id:id});
        return res.status(200).json({ message: "Product Deleted Successfully"});
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