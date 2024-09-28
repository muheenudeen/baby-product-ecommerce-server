import express from 'express'
import { productController } from '../../../Controller/userSide/productController/productController.js'
import { wishlistController } from '../../../Controller/userSide/wishListController/wishListController.js'
import authData from '../../../Middleware/joiValidation/authData.js'
import { cartControllers, cartMiddleware } from '../../../Middleware/joiValidation/cartMiddleware.js'
import { getCart, removeCart } from '../../../Controller/userSide/cartController/cartController.js'
import { getOrders , addOrder } from '../../../Controller/userSide/orderController/orderController.js'
import { authController } from '../../../Controller/authController/authController.js'
const userRouter = express.Router()

// userRouter.post("/signup", userController.signUp)
// userRouter.post("/login", userController.login)
// userRouter.post("/logout", userController.logout)


userRouter.post("/signup",authController.signUp)
userRouter.post("/login",authController.login)
userRouter.post("/logout",authController.logout)

userRouter.get("/products", productController.getProducts,)
userRouter.get("/products/:id", productController.getProductsId)

//cart
userRouter.post("/cart/:id", cartMiddleware, cartControllers)
userRouter.get("/cart/:id", getCart)
userRouter.delete("/cart/:id", authData, removeCart)

userRouter.post("/wishlists/:id", authData, wishlistController.addToWishList)
userRouter.get("/wishlists/:id", authData, wishlistController.getWishList)
userRouter.delete("/wishlists/:id", authData, wishlistController.deleteWishList)

userRouter.get("/orders/:id", authData, getOrders)
userRouter.post("/orders/:id", authData,addOrder )





export default userRouter
