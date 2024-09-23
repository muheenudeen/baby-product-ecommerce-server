import mongoose from "mongoose";

const addToCart = async (req,res) =>{
    try {
        
        const userId = req.params.id;
        const {productId, quantity} = req.body;

        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400)
            .json({success:false, message : "user not found"})
        }
        


    } catch (error) {
        
    }
}