import express from 'express'
import { userController } from "../../../Controller/userSide/userController/userController.js"
const userRouter = express.Router()

userRouter.post("/signup",userController.signUp)
userRouter.post("/login",userController.login)
userRouter.post("/logout",userController.logout)

userRouter.pos("/products",userController)

export default userRouter
