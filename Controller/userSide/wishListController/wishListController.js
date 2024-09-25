import mongoose from "mongoose";
import wishListSchemas from "../../../Model/wishListSchema/wishListSchema.js";
import User from "../../../Model/userSchema/userSchema.js";
import productsSchema from "../../../Model/productSchema/productSchema.js";

const addToWishList = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, errors: ["Invalid userId"] });
    }

    const productExist = await productsSchema.findById(productId);
    if (!productExist) {
      return res.status(404).json({ success: false, errors: ["Product not found"] });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, errors: ["User not found"] });
    }

    let wishlist = await wishListSchemas.findOne({ userId });

    if (!wishlist) {
      wishlist = new wishListSchemas({
        userId,
        products: [{ productId }],
      });
      user.wishlist = wishlist._id;
    } else {
      const existingProduct = wishlist.products.some(
        (product) => product.productId.toString() === productId
      );
      if (existingProduct) {
        return res.status(400).json({ success: false, errors: ["Product already in wishlist"] });
      }
      wishlist.products.push({ productId });
    }

    await wishlist.save();
    await user.save();

    res.status(200).json({
      success: true,
      data: wishlist.products,
      message: "Product added to wishlist successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, errors: [`${error.message}`] });
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

    res.status(200).json({
      success: true,
      data: wishlist.products,
      message: "Wishlist retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, errors: [`Failed to fetch list: ${error.message}`] });
  }
};

const deleteWishList = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, errors: ["Invalid userId"] });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, errors: ["User not found"] });
    }

    const productExist = await productsSchema.findById(productId);
    if (!productExist) {
      return res.status(404).json({ success: false, errors: ["Product not found"] });
    }

    const wishlist = await wishListSchemas.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ success: false, errors: ["Wishlist not found"] });
    }

    const productIndex = wishlist.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ success: false, errors: ["Product not found in wishlist"] });
    }

    wishlist.products.splice(productIndex, 1);
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [`Failed to remove product: ${error.message}`],
    });
  }
};

export const wishlistController = {
  addToWishList,
  getWishList,
  deleteWishList,
};
