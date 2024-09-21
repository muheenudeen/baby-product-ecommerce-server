import express from "express";
import mongoose from 'mongoose';
const app = express()
const PORT = 3000;
import userRouter from "./Routers/userSide/userRouter/userRouter.js";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://muheenudeen313:pVw3ZO2Lbiyzb7NP@cluster0.6l0us.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

}


app.use(express.json())
app.use('/api/user',userRouter)

app.listen(PORT,()=>{
console.log("server running");

})