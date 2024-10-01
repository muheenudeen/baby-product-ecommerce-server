import express from 'express'
import { productController } from '../../../Controller/userSide/productController/productController.js'
import { wishlistController } from '../../../Controller/userSide/wishListController/wishListController.js'
import { cartControllers, cartMiddleware } from '../../../Middleware/joiValidation/cartMiddleware.js'
import { getCart, removeCart } from '../../../Controller/userSide/cartController/cartController.js'
import { authController } from '../../../Controller/authController/authController.js'
import { createPayment, paymentVerification } from '../../../Controller/userSide/paymentController/paymentController.js'
const userRouter = express.Router()


userRouter.post("/signup", authController.signUp)
userRouter.post("/login", authController.login)
userRouter.post("/logout", authController.logout)

userRouter.get("/products", productController.getProducts,)
userRouter.get("/products/:id", productController.getProductsId)

userRouter.post("/cart/:id", cartMiddleware, cartControllers)
userRouter.get("/cart/:id", getCart)
userRouter.delete("/cart/:id", removeCart)

userRouter.post("/wishlists/:id", wishlistController.addToWishList)
userRouter.get("/wishlists/:id", wishlistController.getWishList)
userRouter.delete("/wishlists/:id", wishlistController.deleteWishList)


userRouter.post("/payments/:id", createPayment);
userRouter.post("/paymentverification/:id", paymentVerification)



export default userRouter
