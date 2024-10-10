import express from 'express'
import { getAllUsers, getUserById, userBlockStatus } from '../../../Controller/adminSide/customerContoller/customerController.js'
import { addProducts, deleteProduct, serchProduct, updateProduct } from '../../../Controller/adminSide/adminProductController/productController.js'
import { getAllOrders, getOrdersByUser } from '../../../Controller/adminSide/adminOrder/adminOrder.js'
import { totalRevenue, totalSales } from '../../../Controller/adminSide/adminAnalytics/adminAnalytics.js'
import authData from '../../../Middleware/joiValidation/authData.js'

const adminRouter = express.Router()

adminRouter.get("/users",authData, getAllUsers)
adminRouter.get("/users/:id",authData, getUserById)
adminRouter.put("/users/:id",authData, userBlockStatus)


adminRouter.post("/products",authData, addProducts)
adminRouter.put("/products/:id",authData,updateProduct)
adminRouter.delete("/products/:id",authData, deleteProduct)
adminRouter.post("/products",authData, serchProduct)

//hideprodyuct



adminRouter.get("/orders",authData, getAllOrders)
adminRouter.get("/orders/:id",authData, getOrdersByUser)


adminRouter.get("/totalrevenue",authData, totalRevenue)
adminRouter.get("/totalsale",authData ,totalSales)



export default adminRouter