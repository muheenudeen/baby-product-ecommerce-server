import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/userSide/userRouter/userRouter.js";
import dotenv from 'dotenv';


dotenv.config();


const app = express();
const PORT = 3002;

app.use(express.json());


app.use('/api/user', userRouter);
app.use(express.urlencoded({ extended: false }));



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Mongoose Connection
async function main() {
  try {
    await mongoose.connect('mongodb+srv://muheenudeen313:yTrSorSVsV3DV90f@cluster0.n4jdg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
main();
