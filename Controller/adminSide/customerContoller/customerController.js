import User from "../../../Model/userSchema/userSchema.js";

 export const getAllUsers = async (req,res)=>{
    try {
        
        const users = await User.find({role:{$ne:"admin"}})
if(!users || users.length===0 ){
    return res.status(404).json({success:false, message: "users not found"})
}

res.status(200).json({success:true, message:"user feched successfull" , data:users})

    } catch (error) {
        res.status(500).json({success:false, message:`bad requiest ${error.message}`})
        
    }

}


export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id

        const user= await User.findById(userId)

        if(!user){
            return res.status(404).json({success:false, message:"user not found"})
        }
        res.status(200).json({success:true, message:"user fetched successfull", data:user})
        
    } catch (error) {

        res.status(500).json({success:false, message:`bad request ${error.message}`})
        
    }
}


export const userBlockStatus = async (req,res)=>{

    try {
        
   
    const userId = req.params.id;
    const user = await User.findById(userId);

    if(!user) {
        return res.status(404).json({success:false, message:"user not found"})


    }
    const newStatus = !user.is_blocked;
    await User.findByIdAndUpdate(userId, {is_blocked :newStatus})
    const message = newStatus ? "user blocked successfully" : "user unblocked"

    return res.status(200).json({ success:true, message ,newStatus})

    

} catch (error) {

    res.status(500).json({success:false, message:`bad request ${error.message}`})
}   
}
