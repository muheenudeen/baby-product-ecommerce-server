// import mongoose from "mongoose";
// import orderSchemas from "../../../Model/orderSchema/orderSchema.js";



// //order display

// export const getOrders = async (req, res) => {
//     try {

//         const userId = req.params.id;

//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ success: false, message: "user no found" })
//         }

//         const orderList = await orderSchemas
//             .find({ userId })
//             .populate("products.productId");

//         if (!orderList) {
//             return res.status(404)
//                 .json({ success: false, message: "order not found" })
//         }

//         res.status(200).json({ success: true, message: "order list compleetd", data:orderList })

//     } catch (error) {

//         res.status(500).json({ success: false, message: `${error.message}` })

//     }
// }

