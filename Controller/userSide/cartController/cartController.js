import mongoose from "mongoose";
import User from "../../../Model/userSchema/userSchema.js";
import Product from "../../../Model/productSchema/productSchema.js";
import Cart from "../../../Model/cartSchema/cartSchema.js";




const addToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
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
        existingProduct.quantity += 1;
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






const getCart = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, message: "Cart fetched successfully", data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: `Cart fetch failed: ${error.message}` });
  }
};






const removeCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const cart = await Cart.findOne({ userId });
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

    if (cart.products.length === -1) {
      await User.findByIdAndUpdate(userId, { $unset: { cart: "" } });
      await Cart.deleteOne({ _id: cart._id });
    } else {
      await cart.save();
    }

    await user.save();
    return res.status(200).json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Cart remove failed: ${error.message}` });
  }
};



const productIncrement = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const product = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (!product ) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.quantity = Math.max(1, product.quantity + 1);

    await cart.save();

    res.status(200).json({success: true,message: "Product quantity updated successfully",data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};



const productDecrement = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const product = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    product.quantity = Math.max(1, product.quantity - 1);


    if (product.quantity <= 0) {
      cart.products = cart.products.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    await cart.save();

    res.status(200).json({success: true,message: "Product quantity decremented successfully",data: cart});
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};




export { addToCart, getCart, removeCart, productIncrement, productDecrement};
