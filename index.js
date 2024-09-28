import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./Routers/userSide/userRouter/userRouter.js";
import adminRouter from "./Routers/adminSide/adminRouter/adminRouter.js";


dotenv.config();


const app = express();
const PORT = 3002;

app.use(express.json());



app.use('/api/user', userRouter);
app.use("/api/admin", adminRouter)

app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Mongoose Connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

main();
