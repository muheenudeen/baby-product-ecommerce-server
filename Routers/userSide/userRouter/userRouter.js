import express from 'express'
import { productController } from '../../../Controller/userSide/productController/productController.js'
import { wishlistController } from '../../../Controller/userSide/wishListController/wishListController.js'
import { cartControllers, cartMiddleware } from '../../../Middleware/joiValidation/cartMiddleware.js'
import { getCart, removeCart } from '../../../Controller/userSide/cartController/cartController.js'
import { authController } from '../../../Controller/authController/authController.js'
import { createPayment, paymentVerification } from '../../../Controller/userSide/paymentController/paymentController.js'
import { paymentStatus } from '../../../Controller/adminSide/adminOrder/adminOrder.js'
import authData from '../../../Middleware/joiValidation/authData.js'
const userRouter = express.Router()


userRouter.post("/signup", authController.signUp)
userRouter.post("/login", authController.login)
userRouter.post("/logout", authController.logout)

userRouter.get("/products", productController.getProducts,)
userRouter.get("/products/:id",authData, productController.getProductsId)

userRouter.post("/cart/:id",authData, cartMiddleware, cartControllers)
userRouter.get("/cart/:id",authData, getCart)
userRouter.delete("/cart/:id",authData, removeCart)

userRouter.post("/wishlists/:id",authData, wishlistController.addToWishList)
userRouter.get("/wishlists/:id",authData, wishlistController.getWishList)
userRouter.delete("/wishlists/:id",authData, wishlistController.deleteWishList)


userRouter.post("/payments/:id",authData, createPayment);
userRouter.post("/paymentverification/:id",authData, paymentVerification)

userRouter.post("/status/:id",paymentStatus)



export default userRouter
