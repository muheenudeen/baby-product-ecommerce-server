import mongoose from "mongoose";
import User from "../../../Model/userSchema/userSchema.js";
import productsSchema from "../../../Model/productSchema/productSchema.js";
import cartSchema from "../../../Model/cartSchema/cartSchema.js";

// Add product to cart

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
      await user.save();
    } else {
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
    }

    return res.status(200).json({ success: true, message: "Product added to cart", cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

// Display cart products
const getCart = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const cart = await cartSchema
      .findOne({ userId })
      .populate("products.productId");

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, message: "Cart fetched successfully", data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Cart fetch failed: ${error.message}`,
    });
  }
};

// Remove product from cart
const removeCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const cart = await cartSchema.findOne({ userId });
    const user = await User.findById(userId);

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const productExistIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productExistIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    cart.products.splice(productExistIndex, 1);

    if (cart.products.length === 0) {
      await User.findByIdAndUpdate(userId, { $unset: { cart: "" } });
      await cartSchema.deleteOne({ _id: cart._id });
    } else {
      await cart.save();
    }

    await user.save();
    return res.status(200).json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Cart removal failed: ${error.message}` });
  }
};

// Increment product quantity
const productIncrement = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const cart = await cartSchema.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    cart.products[productIndex].quantity += quantity > 0 ? quantity : 1;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

// Decrement product quantity
const productDecrement = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cart = await cartSchema.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    cart.products[productIndex].quantity -= 1;

    if (cart.products[productIndex].quantity < 1) {
      cart.products[productIndex].quantity = 1;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product quantity decremented successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

export {
  addToCart,
  getCart,
  removeCart,
  productIncrement,
  productDecrement,
};
