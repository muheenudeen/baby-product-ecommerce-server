import mongoose from "mongoose";
import productsSchema from "../../../Model/productSchema/productSchema.js";
import { productValidation } from "../../../Middleware/joiValidation/productValidation.js";


export const addProducts = async (req,res)=>{

    try {

        const {title, price, category} = req.body;

        const validateProduct = await productValidation.validateAsync(req.body)
        
        const existProduct = await productsSchema.findOne({title})

        if(existProduct){
            return res.status(401).json({success:false, message:`product alredy existed ${title}`})

        }

        const newProduct = new productsSchema(validateProduct)

        await newProduct.save()

        res.status(200).json({success:true, message:"product added" ,newProduct})
    } catch (error) {
        
        res.status(500).json({success:false, message:`bad request ${error.message}`})
    }

}



