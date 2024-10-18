import mongoose from "mongoose";
import wishListSchemas from "../../../Model/wishListSchema/wishListSchema.js";
import User from "../../../Model/userSchema/userSchema.js";
import productsSchema from "../../../Model/productSchema/productSchema.js";




const addToWishList = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, errors: ["Invalid IDs"] });
    }

    const product = await productsSchema.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, errors: ["Product not found"] });
    }

    let wishlist = await wishListSchemas.findOne({ userId });

    if (!wishlist) {
      wishlist = new wishListSchemas({ userId, products: [{ productId }] });
    } else {
      const productExists = wishlist.products.some(item => item.productId.toString() === productId);
      if (productExists) {
        return res.status(400).json({ success: false, errors: ["Product already in wishlist"] });
      }

      wishlist.products.push({ productId });
    }

    await wishlist.save();
    res.status(200).json({ success: true, data: wishlist.products, message: "Product added to wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, errors: [error.message] });
  }
};





const getWishList = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, errors: ["Invalid userId"] });
    }

    const wishlist = await wishListSchemas.findOne({ userId }).populate("products.productId");

    if (!wishlist) {
      return res.status(404).json({ success: false, errors: ["Wishlist not found"] });
    }

    res.status(200).json({ success: true, data: wishlist.products });
  } catch (error) {
    res.status(500).json({ success: false, errors: [error.message] });
  }
};






const deleteWishList = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user id" });
    }

    const wishlist = await wishListSchemas.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ success: false, errors: "Wishlist not found" });
    }

   
    const productIndex = wishlist.products.findIndex(
      item => item.productId.toString() === productId
    );
   

    if (productIndex === -1) {
      return res.status(404).json({ success: false, errors: "Product not found in wishlist" });
    }
    

    wishlist.products.splice(productIndex, 1);
    await wishlist.save();

    res.status(200).json({ success: true, message: "Product removed from wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, errors: [error.message] });
  }
};

export const wishlistController = { addToWishList, getWishList, deleteWishList };
