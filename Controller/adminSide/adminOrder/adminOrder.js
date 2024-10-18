import mongoose from "mongoose";
import orderSchemas from "../../../Model/orderSchema/orderSchema.js";

export const getAllOrders = async (req, res) => {
    try {

        const order = await orderSchemas.find();

        if (!order) {
            return res.status(400).json({ success: false, message: "order is no found" })
        }

        res.status(200).json({ success: true, message: "orders fetched successfully", data: order })

    } catch (error) {
        res.status(500).json({ success: false, message: `bad request ${error.message}` })

    }
}




export const getOrders= async (req,res)=>{
     try {
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
         return   res.status(400).json({success:false,message:"Invalid user id"})
        }
        const orderList=await orderSchemas.find({userId}).populate('products.productId')
        if(!orderList || orderList.length === 0){
            return res.status(404).json({success:false,message:"Order not found"})
        }
        res.status(200).json({success:true,data:orderList,message:"Order list fetch successfully"})

     } catch (error) {
        
     }
}


export const paymentStatus = async (req,res)=> {

    try {


      const { status } = req.query
      const userId = req.params

   
    const orderByUser = await orderSchemas.findOne({ userId })
    if (!orderByUser) {
        return res.status(400).json({ success: false, message: "no order found" })
    }

    showStatus = await orderSchemas.find({ status });

res.status(200).json({success:true , message:"payment compleet", data:showStatus})
        
    } catch (error) {
        res.status(500).json({ success: false, message: `${error.message}` })

    }

}