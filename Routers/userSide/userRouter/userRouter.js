import express from 'express'
import { userController } from "../../../Controller/userSide/userController/userController.js"
import { productController } from '../../../Controller/userSide/productController/productController.js'
import { cartController } from '../../../Controller/userSide/cartController/cartController.js'
import { wishlistController } from '../../../Controller/userSide/wishListController/wishListController.js'
import authData from '../../../Middleware/joiValidation/authData.js'
 import { cartControllers,cartMIddleware } from '../../../Middleware/joiValidation/cartMiddleware.js'

const userRouter = express.Router()

userRouter.post("/signup",userController.signUp)
userRouter.post("/login",userController.login)
userRouter.post("/logout",userController.logout)

userRouter.get("/products",productController.getProducts,)
userRouter.get("/:id/products",productController.getProductsId)

//cart
userRouter.post("/:id/cart",cartControllers, cartMIddleware)
userRouter.get("/:id/cart",authData,cartController.getCart)
userRouter.delete("/:id/cart",authData,cartController.removeCart)

userRouter.post("/:id/wishalists",authData,wishlistController.addToWishList)
userRouter.get("/:id/wishalists",authData,wishlistController.getWishList)
userRouter.delete("/:id/wishalists",authData,wishlistController.deleteWishList)




export default userRouter
