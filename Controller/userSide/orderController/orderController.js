import mongoose from "mongoose";
import orderSchemas from "../../../Model/orderSchema/orderSchema.js";
import User from "../../../Model/userSchema/userSchema.js";
import cartSchema from "../../../Model/cartSchema/cartSchema.js";
import productsSchema from "../../../Model/productSchema/productSchema.js";


//order display

const getOrders = async (req, res) => {
    try {

        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "user no found" })
        }

        const orderList = await orderSchemas
            .find({ userId })
            .populate("products.productId");

        if (!orderList) {
            return res.status(404)
                .json({ success: false, message: "order not found" })
        }

        res.status(200).json({ success: true, message: "order list compleetd", data:orderList })

    } catch (error) {

        res.status(500).json({ success: false, message: `${error.message}` })

    }
}


  //add order

   const addOrder = async (req, res) => {
    try {
      const userId = req.params.id;
      const { productId } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "No user found" });
      }
  
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }
      const user = await User.findById(userId);
      const productExists = await productsSchema.findById(productId);
      if (!productExists) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
  
      const cart = await cartSchema.findOne({ userId });
      if (!cart) {
        return res
          .status(404)
          .json({ success: false, message: "Cart not found" });
      }
  
      const productInCart = cart.products.find(
        (prodct) => prodct.productId.toString() === productId
      );
  
      if (!productInCart) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found in cart" });
      }
  
      let order = await orderSchemas.findOne({ userId });
  
      if (!order) {
        order = new orderSchemas({
          userId,
          products: [{ productId, quantity: productInCart.quantity }],
        });
      }
      
      user.order.push(order._id)
      await order.save();

      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Order successfully completed",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:` Failed to order product: ${error.message}`,
});
}
  };

export { getOrders ,addOrder }