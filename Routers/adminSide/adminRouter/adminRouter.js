import express from 'express'
import { getAllUsers, getUserById, userBlockStatus } from '../../../Controller/adminSide/customerContoller/customerController.js'
import { addProducts, deleteProduct, serchProduct, updateProduct } from '../../../Controller/adminSide/adminProductController/productController.js'
import { getAllOrders, getOrdersByUser } from '../../../Controller/adminSide/adminOrder/adminOrder.js'
import { totalRevenue, totalSales } from '../../../Controller/adminSide/adminAnalytics/adminAnalytics.js'


const adminRouter = express.Router()

adminRouter.get("/users",getAllUsers)
adminRouter.get("/users/:id",getUserById)
adminRouter.put("/users/:id",userBlockStatus)


adminRouter.post("/products",addProducts)
adminRouter.put("/products/:id",updateProduct)
adminRouter.delete("/products/:id",deleteProduct)
adminRouter.post("/products",serchProduct)



adminRouter.get("/orders",getAllOrders)
adminRouter.get("/orders/:id",getOrdersByUser)


adminRouter.get("/totalrevenue",totalRevenue)
adminRouter.get("/totalsale",totalSales)



export default adminRouter