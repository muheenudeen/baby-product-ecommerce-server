import { addToCart, productDecrement, productIncrement } from "../../Controller/userSide/cartController/cartController.js";




 const  cartMiddleware=(req,res,next)=>{
    try {
        const {action}=req.body;
        if(action === "increment"){
            req.controller=productIncrement;
        }
        else if(action === "decrement"){
            req.controller=productDecrement;
        }
        else{
            req.controller=addToCart
        }
        next()
    } catch (error) {
        res
      .status(500)
      .json({ success: false, message: `Bad request ${error.message}` });
    }
}
const cartControllers= async(req,res,next)=>{
    try {
        req.controller(req,res,next)
    } catch (error) {
        res.status(500).json({success:false,message:`bad request ${error.message}`})
    }
}

export { cartMiddleware, cartControllers };
