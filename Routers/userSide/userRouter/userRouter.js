import express from 'express'
import { userController } from "../../../Controller/userSide/userController/userController.js"
import { productController } from '../../../Controller/userSide/productController/productController.js'
const userRouter = express.Router()

userRouter.post("/signup",userController.signUp)
userRouter.post("/login",userController.login)
userRouter.post("/logout",userController.logout)

userRouter.get("/products",productController.getProducts)
userRouter.get("/products/:id",productController.getProductsId)

export default userRouter
