import { cartController } from "../../Controller/userSide/cartController/cartController.js";

const cartMIddleware = (req,res,next)=>{
    try {
        
    const {action}=req.body;

    if(action === "increment"){
        req.controller = cartController.productIncrement;
    }else if (action === "decrement"){
        req.controller = cartController.productDecrement;

    }else{
        req.controller = cartController.addToCart;
    }
    next()

    } catch (error) {
        res.send(500)
        .json({success:false, message:`${error.message}`})
        
    }
}

//cart conttroller

const cartControllers = (req,res,next)=>{
    try{
        req.controller(req,res,next)

    }catch(error){
        res.send(500).json({success:false, message:`${error.message}`})
    }
}

export const cartMIddlewares ={
    cartMIddleware,
    cartControllers,
}