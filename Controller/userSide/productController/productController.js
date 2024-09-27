import mongoose from "mongoose";
import productsSchema from "../../../Model/productSchema/productSchema.js";

//all products

const getProducts = async (req, res) => {
    try {

        const { category } = req.body;
        let getProducts;


        if (category) {
            getProducts = await productsSchema.find({ category });
            if (getProducts.length === 0) {
                return res.status(400).json({ success: false, message: `categoru not founded` })
            }
        } else {
            getProducts = await productsSchema.find()
        }
        res.status(200).json({ success: true, data: getProducts, message: "product successfully" })


    } catch (error) {

        res.status(500).json({ success: false, message: `${error.message}` })

    }
}

//productsId

const getProductsId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "productId invalid" })
        }

        const product = await productsSchema.findById(id)
        if (!product) {
            return res.status(404).json({ success: false, message: "product not founded" })

        }
        res.status(200).json({ success: true, data: product, message: "product fetched by id" })


    } catch (error) {
        res.status(500).json({ success: false, message: `server errror ${error.message}` })
    }
}


export const productController = {
    getProducts,
    getProductsId,
}



