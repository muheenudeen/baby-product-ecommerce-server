import mongoose from "mongoose";
import User from "../../../Model/userSchema/userSchema.js";
import productsSchema from "../../../Model/productSchema/productSchema.js";
import cartSchema from "../../../Model/cartSchema/cartSchema.js";
import { populate } from "dotenv";

const addToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const user = await User.findById(userId);
    const product = await productsSchema.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await cartSchema.findOne({ userId }); 
    if (!cart) {
      cart = new cartSchema({
        userId,
        products: [{ productId, quantity }], 
      });

      user.cart = cart._id;
      await cart.save();
    } else {
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity+= quantity;
      } else {
        cart.products.push({ productId, quantity});
      }

      await cart.save();
    }

    return res.status(200).json({ success: true, message: "Product added to cart", cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

//display cart product

const getCart = async (req,res)=>{
    try {
        const userId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({success:false , message:"no user founded"})
        }
        const cart = await cartSchema
        .findOne({userId})
        populate("product.productId")

        if(!cart)
        {
            return res.status(400).json({success:false , message:"cart not found"});
        }

        res.status(200).json({success:true , message:"cart feched successfull"})
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`cart fatched faild ${error.message}`
        })
    }
}

export const cartController ={
    addToCart,
    getCart,
}