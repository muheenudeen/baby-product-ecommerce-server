import express from 'express'
import { getAllUsers, getUserById, userBlockStatus } from '../../../Controller/adminSide/customerContoller/customerController.js'
import { addProducts, deleteProduct, serchProduct, updateProduct } from '../../../Controller/adminSide/adminProductController/productController.js'
import { getAllOrders } from '../../../Controller/adminSide/adminOrder/adminOrder.js'
import { totalRevenue, totalSales } from '../../../Controller/adminSide/adminAnalytics/adminAnalytics.js'
import authData from '../../../Middleware/joiValidation/authData.js'

const adminRouter = express.Router()

adminRouter.get("/users", getAllUsers)
adminRouter.get("/users/:id",authData, getUserById)
adminRouter.put("/users/:id", userBlockStatus)


adminRouter.post("/products", addProducts)
adminRouter.put("/products/:id",updateProduct)
adminRouter.delete("/products/:id", deleteProduct)
adminRouter.post("/products",authData, serchProduct)



adminRouter.get("/orders",authData, getAllOrders)


adminRouter.get("/totalrevenue",authData, totalRevenue)
adminRouter.get("/totalsale",authData ,totalSales)



export default adminRouter