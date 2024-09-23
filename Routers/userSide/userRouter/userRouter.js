import express from 'express'
import { userController } from "../../../Controller/userSide/userController/userController.js"
import { productController } from '../../../Controller/userSide/productController/productController.js'
const userRouter = express.Router()

userRouter.post("/signup",userController.signUp)
userRouter.post("/login",userController.login)
userRouter.post("/logout",userController.logout)

userRouter.post("/products",productController.getProducts)
userRouter.post("/productsid",productController.productsId)

export default userRouter
