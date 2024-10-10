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



export const getOrdersByUser = async (req, res) => {
    try {

        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "user not found" })
        }

        const orderByUser = await orderSchemas.findOne({ userId })

        if (!orderByUser) {
            return res.status(400).json({ success: false, message: "no order found" })
        }
        res.status(200).json({ success: true, message: "order fetched succesfully", orderByUser })

    } catch (error) {

        res.status(500).json({ success: false, message: `bad request ${error.message}` })

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