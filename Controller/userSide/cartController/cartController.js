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
        // console.log(req.params.userId);
        
        .populate("products.productId")

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

//remove from cart

// const removeCart = await (req,res)=>{
//     try {
        
//         const userId = req.params.id;
//         const {productId} = req.body;

//         if(!mongoose.Types.ObjectId.isValid(userId)){
//             return res.status(400).json({success:false , message:"no user found"})

//         }
//         const cart = await cartSchema.findOne({userId})
//         const user = await User.findById(userId)

//         if(!cart ){
//             res.status(400).json({success:false, message:"cart not found"})
//         }
// const productExist = cart.products.findIndex(
//     (product)=>product.productId.toString()=== productId
// );

// if(productExist=== -1){
//     res.status(400).json({success:false , message:"product not founded in cart"})
// }

//   cart.products.splice(productExist,1);
//   if(cart.products.length===0){
//     await User.findByIdAndUpdate(userId,{
//         $unset: {cart:""},

//     })
//     await cartSchema.deleteOne({ _id: cart._id});
//   }  else{
//     await cart.save();
//   }
//   await user.save();

//   res.status(200).json({success:true, message:{"product removde from cart"}})

//     } catch (error) {

//         res.status(500).json({success:false, message:`cart removing faild ${error.message}`)
        
//     }
// }
const removeCart = async (req, res) => {
    try {
      const userId = req.params.id;
      const { productId } = req.body;
  
      // Check if userId is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
      }
  
      // Fetch the user's cart and user details
      const cart = await cartSchema.findOne({ userId });
      const user = await User.findById(userId);
  
      // Check if the cart exists
      if (!cart) {
        return res.status(400).json({ success: false, message: "Cart not found" });
      }
  
      // Check if the product exists in the cart
      const productExistIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId
      );
  
      if (productExistIndex === -1) {
        return res.status(400).json({ success: false, message: "Product not found in cart" });
      }
  
      // Remove the product from the cart
      cart.products.splice(productExistIndex, 1);
  
      // If the cart is empty after removal, remove the cart
      if (cart.products.length === 0) {
        // Unset the cart reference in the user's document
        await User.findByIdAndUpdate(userId, { $unset: { cart: "" } });
        
        // Delete the cart
        await cartSchema.deleteOne({ _id: cart._id });
      } else {
        // Otherwise, just save the updated cart
        await cart.save();
      }
  
      // Save user data if necessary
      await user.save();
  
      // Success response
      return res.status(200).json({ success: true, message: "Product removed from cart" });
    } catch (error) {
      // Catch any error and send a failure response
      return res.status(500).json({ success: false, message: `Cart removal failed: ${error.message}` });
    }
  };
  

export const cartController ={
    addToCart,
    getCart,
    removeCart,
}