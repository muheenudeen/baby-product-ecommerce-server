import mongoose from "mongoose";
import productsSchema from "../../../Model/productSchema/productSchema";


const getAllProducts = async (req,res)=>{
    try {

    const {category} = req.query;
     let getAllProduct

     if(category){
        getAllProduct = await productsSchema.find({category})

        if(getAllProduct.length === 0){
            return res.status(400).json({success:false, message:"product not found"})
        }

     }else{
        getAllProduct = await productsSchema.find();

     }
     res.status(200).json({success:true, message:"products fetched succcessfull" , data:getAllProduct})

        
    } catch (error) {
        res.status(500).json({success:false , message:``})
        
    }
}
