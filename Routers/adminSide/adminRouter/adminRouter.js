import express from 'express'
import { getAllUsers, getUserById } from '../../../Controller/adminSide/customerContoller/customerController.js'
import { addProducts, deleteProduct } from '../../../Controller/adminSide/adminProductController/productController.js'


const adminRouter = express.Router()

adminRouter.get("/users",getAllUsers)
adminRouter.get("/users/:id",getUserById)


adminRouter.post("/products",addProducts)
adminRouter.post("/products/:id",deleteProduct)



export default adminRouter