import express from 'express'
import { getAllUsers, getUserById } from '../../../Controller/adminSide/customerContoller/customerController.js'
import { addProducts } from '../../../Controller/adminSide/adminProductController/productController.js'


const adminRouter = express.Router()

adminRouter.get("/users",getAllUsers)
adminRouter.get("/users/:id",getUserById)


adminRouter.post("/products",addProducts)


export default adminRouter