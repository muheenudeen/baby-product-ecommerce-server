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
        
        res.status(500).json({success:false, message:`bad request${error.message}`})
    }

}


export const updateProduct = async (req,res) => {
    try {
        
        const productId = req.params.id;
        const productUpdate = req.body;

        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({success:false , message:"product not found"})
        }

        const updateProducts = await productsSchema.findByIdAndUpdate(productId, productUpdate, {new :true});

        if(!updateProducts){

            return res.status(404).json({success:false, message:"product not found"})
        }

        res.status(200).json({success:true, message:"product updated successfully" ,updateProducts})
    } catch (error) {
        
        if(error.isJoi === true){
            return res.status(500).json({success:false, message:`bad request ${error.message}`})
        }
    }
}



export const deleteProduct = async (req,res) =>{

    try {

        const productId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(productId)){
            res.status(404).json({success:`product  no found`})
        }
        const deleteProducts = await productsSchema.findByIdAndDelete(productId)

        if(!deleteProducts){
            return res.status(400).json({success:false, message:"product not found"})
        }

        res.status(200).json({success:true, message:"product delete successfull"})
    } catch (error) {
        res.status(500).json({success:false , message:`bad request ${error.message}`})
    }

}



const serchProduct = async (req,res) => {

    try {

        const {serchQuery} = req.query;

        const serchProducts = await productsSchema.find({
            productName: {$regex: serchQuery, $options: "i"},
        })
        res.status(200).json({success:true, message:"serch success", data:serchProducts,})

        
    } catch (error) {

        res.status(500).json({success:false, message:`bad request ${error.message}`})
        
    }

      };