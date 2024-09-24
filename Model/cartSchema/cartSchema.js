import mongoose from "mongoose";

const cartSchemas = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true,
    },
    products:[
        {
            productId: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"products",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
            },
        },
    ],
});

const cartSchema = mongoose.model("cart",cartSchemas)

export default cartSchema