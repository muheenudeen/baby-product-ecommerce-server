import mongoose from "mongoose";

const cartSchemas = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
            
                
            },
        },
    ],
});

const cartSchema = mongoose.model("cart",cartSchemas)

export default cartSchema