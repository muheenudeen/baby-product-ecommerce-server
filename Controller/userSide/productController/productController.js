import mongoose from "mongoose";
import productsSchema from "../../../Model/productSchema/productSchema";

//all products

const getProducts =async (req,res)=>{
    try {
        
        const {category} = req.query;
        let getProducts;


        if(category){
            getProducts = await productsSchema.find({category});
            if(getProducts.length === 0){
                return res.status(400).json({success : false, message: `categoru not founded`})
            }
        }else{
            getProducts = await productsSchema.find()
        }
        res.status(200).json({success:true,data:getProducts, message:"product successfully"})


    } catch (error) {

        res.status(500).json({success:false, message:`${error.message}`})
        
    }
}

export const productController = {
    getProducts,
}