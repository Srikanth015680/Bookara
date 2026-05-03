import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModels.js";


//controller function to create product

const createProduct=async(req,res)=>{
    try{
        const{name,description,category,price,popular}=req.body;
        
        if (!name || !description || !category || !price) {
            return res.status(400).json({
                 success: false,
                message: "All fields are required"
                    });
                }
        
        
        let imageUrl="https://via.placeholder.com/150"//default image url


        //only upload the image if one is provided

        if(req.file){
            console.log("Uploaded File: ",req.file);
            imageUrl=await cloudinary.uploader.upload(req.file.path,{resource_type:"image"}).then(res=>res.secure_url)
        }

        const productData={
            name,
            description,
            category,
            price:Number(price),
            popular:popular==="true"?true:false,
            image:imageUrl,
            date:Date.now()
        }

        console.log("Product Data: ",productData)
        const product=new productModel(productData);
        await product.save()
        
        res.status(201).json({
            success:true,
            message:"Product Created"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:e.message
        })

    }
}



//controller function to delete product

const deleteProduct=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({
            success:true,
            message:"Product Deleted"
        })
        

    }catch(e){

        console.log(e);
        res.status(500).json({
            success:false,
            message:e.message
        })


    }
}




//controller function to list all  product

const getAllProduct=async(req,res)=>{
    try{
        const products=await productModel.find({});
        res.status(201).json({
            success:true,
            products
        })
        

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:e.message
        })



    }
}



//controller function fetch a sngle product details

const getProductById=async(req,res)=>{
    try{
        const {productId}=req.body
        const product=await productModel.findById(productId)
        res.status(201).json({
            success:true,
            product
        })
        

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:e.message
        })

    }
}


export {createProduct,deleteProduct,getAllProduct,getProductById}
