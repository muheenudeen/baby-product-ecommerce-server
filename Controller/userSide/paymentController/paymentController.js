import mongoose from "mongoose";
import cartSchema from "../../../Model/cartSchema/cartSchema.js";
import { razorpay } from "../../../Utils/razorPay.js";
import crypto from "crypto"
import User from "../../../Model/userSchema/userSchema.js";
import orderSchemas from "../../../Model/orderSchema/orderSchema.js";
import paymentSchemas from "../../../Model/paymentSchema/paymentSchema.js";



export const createPayment = async (req, res) =>{
    try {

        const userId = req.params.id;
        
        const { currency } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ success: false, message: "user not found" })
        }

        const cart = await cartSchema.findOne({ userId }).populate("products.productId");

        if (cart) {
            return res.status(404).json({ success: false, message: "cart is empty !" })

        }

        const amount = cart.products.map((items) => items.productId.price * items.quantity).reduce((a, b) => a + b, 0)

        if (!currency) {
            return res.status(400).json({ success: false, message: "pleace provide currency" })

        }

        const receipt = `receipt_${Date.now()}`

        const options = {
            amount: amount * 100,
            currency,
            receipt,
        }

        try {

            const order = await razorpay.orders.create(options)

            if (!order) {
                console.log("order creation error :", order);
                return res.status(400).json({ success: false, message: "order creation faild" })

            }
            res.status(200).json({ success: true, message: "payment order creation successfully" })
        } catch (error) {
            console.log("razorpay order creation error:", error);
            res.status(500).json({ success: false, message: `razorpay order creation falid ${error.message}` })



        }
    } catch (error) {

        res.status(500).json({ success: false, message: `faild to create payment faild: ${error.message}` })

    }
}


export const paymentVerification = async (req, res) => {
    try {

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const userId = req.params.id;

        const cart = await cartSchema.findOne({ userId }).populate("products.productId");

        if (!cart) {
            return res.status(400).json({ success: false, message: "cart not found" })
        }
        const amount = cart.products.map((items) => items.productId.price).reduce((a, b) => a + b, 0);

        if (!razorpay_payment_id || razorpay_order_id || razorpay_signature) {

            return res.status(400).json({ success: false, message: "missing payment verification details" })
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature

        if (isAuthentic) {
            const user = await User.findById(userId);

            const order = new orderSchemas({
                userId,
                products: cart.products.map((items) => ({ productId: items.productId.id, quantity: items.quantity, })),

                Total_Amount: amount,
                Payment_Id: razorpay_payment_id,
                Customer_Name: user.username,
                Total_Items: cart.products.length,
                address: user.address,
                city: user.city,
                state: user.state,
                pincode: user.pincode,
                contact: user.contact,

            })

            await order.save();

            await cartSchema.deleteOne({userId});

            const payment = new paymentSchemas ({
                razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount: amount,
          currency: req.body.currency,
          status: "success",
            })
            user.order.push(order._id);
            await user.save()
            await payment.save()

            res.status(200).json({success:true, message:"payment verification successful" ,data:payment})

        }else{
            res.status(400).json({success:false, message:"invalid payment signature"})
        }
    } catch (error) {

        res.status(500).json({success:false, message:`payment verification faild ${error.message}`})

    }
}