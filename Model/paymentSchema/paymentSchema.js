// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema({
//   razorpay_order_id: {
//     type: String,
//     required: true,
//   },
//   razorpay_payment_id: {
//     type: String,
//     required: true,
//   },
//   razorpay_signature: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   currency: {
//     type: String,
//     default: "INR",
//   },
//   status: {
//     type: String,
//     default: "created",
//   },
//   purchaseDate: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const paymentSchemas = mongoose.model("Payment", paymentSchema);

// export default paymentSchemas