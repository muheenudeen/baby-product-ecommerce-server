import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    payment_status: {
      type: String,
      status: ["pending", "fullfilled", "error"],
    },
    
    Total_Amount: {
      type: Number,
    },
    Payment_Id: {
      type: String,
    },
    Total_Items: { type: Number },
    Customer_Name: { type: String },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    contact: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const orderSchemas = mongoose.model("Order", orderSchema);

export default orderSchemas
