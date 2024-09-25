import express from 'express'
import { userController } from "../../../Controller/userSide/userController/userController.js"
import { productController } from '../../../Controller/userSide/productController/productController.js'
import { cartController } from '../../../Controller/userSide/cartController/cartController.js'
import { authDatas } from '../../../Middleware/joiValidation/authData.js'
import { cartMIddlewares } from '../../../Middleware/joiValidation/cartMiddleware.js'


const userRouter = express.Router()

userRouter.post("/signup",userController.signUp)
userRouter.post("/login",userController.login)
userRouter.post("/logout",userController.logout)

userRouter.get("/products",productController.getProducts,)
userRouter.get("/products/:id",productController.getProductsId)

userRouter.post("/:id/cart", authDatas.authData,cartMIddlewares.cartControllers,cartMIddlewares.cartMIddleware)
userRouter.get("/:id/cart",authDatas.authData,cartController.getCart)
userRouter.delete("/:id/cart",authDatas.authData,cartController.removeCart)


export default userRouter
