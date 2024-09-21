const express = require ("express")

const app = express()
const PORT = 3000;

const userRouter = require('./routers/userRouters')

app.use(express.json())
app.use('/user',userRouter)

app.listen(PORT,()=>{
console.log("server running");

})

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://muheenudeen313:pVw3ZO2Lbiyzb7NP@cluster0.6l0us.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

}