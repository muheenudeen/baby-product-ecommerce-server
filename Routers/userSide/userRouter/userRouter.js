import express from 'express'
import { userController } from "../../../Controller/userSide/userController/userController.js"
import { productController } from '../../../Controller/userSide/productController/productController.js'
import { wishlistController } from '../../../Controller/userSide/wishListController/wishListController.js'
import authData from '../../../Middleware/joiValidation/authData.js'
import { cartControllers, cartMiddleware } from '../../../Middleware/joiValidation/cartMiddleware.js'
import { getCart, removeCart } from '../../../Controller/userSide/cartController/cartController.js'
import getOrders from '../../../Controller/userSide/orderController/orderController.js'

const userRouter = express.Router()

userRouter.post("/signup", userController.signUp)
userRouter.post("/login", userController.login)
userRouter.post("/logout", userController.logout)

userRouter.get("/products", productController.getProducts,)
userRouter.get("/:id/products", productController.getProductsId)

//cart
userRouter.post("/:id/cart",cartMiddleware, cartControllers)
userRouter.get("/:id/cart", getCart)
userRouter.delete("/:id/cart", authData, removeCart)

userRouter.post("/:id/wishlists", authData, wishlistController.addToWishList)
userRouter.get("/:id/wishlists", authData, wishlistController.getWishList)
userRouter.delete("/:id/wishlists", authData, wishlistController.deleteWishList)

userRouter.get("/:id/orders",authData,getOrders)




export default userRouter
