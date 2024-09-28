import express from 'express'
import { getAllUsers, getUserById } from '../../../Controller/adminSide/customerContoller/customerController.js'


const adminRouter = express.Router()

adminRouter.get("/users",getAllUsers)
adminRouter.get("/users/:id",getUserById)


export default adminRouter