import mongoose from "mongoose"
const productSchema = new mongoose.Schema(
    {
          title:{
          type:String,
          },
          imageSrc: {
            type: String,
          },
          imageAlt: {
            type: String,
          },
          description: {
            type: String,
            require:true,
          },
          price: {
            type: Number,
           
          },
          
          category: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
          isDeleted: {
            type: Boolean,
            default: false,
          },
    },
    {

        timestamps:true,
    }

)


const productsSchema = mongoose.model("products",productSchema)

export default productsSchema