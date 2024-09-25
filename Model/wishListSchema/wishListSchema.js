import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            require:true
        
    },
    products: [
        {
            productId: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"products",
                require:true,
            }
        }
    ]
})

const wishListSchemas = mongoose.model("wishlists", wishListSchema)

 export default wishListSchemas