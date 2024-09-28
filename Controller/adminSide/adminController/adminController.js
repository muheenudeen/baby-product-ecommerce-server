// import { bcryptData } from "../../../Utils/bcrypt";
// import generateToken from "../../../Utils/jwt";
// import User from "../../../Model/userSchema/userSchema";

// export const adminLogin = async (req,res)=>{
//     try {
        
//         const {email, password }=req.body;

//         const admin = await User.findOne({email})

//         if(!admin){
//             return res.status(400).json({success:false, message:"invalid user create an account"})
//         }

//         const validPassword = bcryptData.comparePassword(password,admin.password)

//         if(!validPassword){
//             return res.status(400).json({success:false, message : "incorrect pass/username"})
//         }

//         if(admin.role === "admin"){
//             const token = generateToken(admin.id)
//             return res.status(200).json({ success:true, message:"admin login successfull" , email:admin.email, password:admin.password ,token
//             })
//         }else{
//             res.status(400).json({success:false, message:"it is not admin"})
//         }


//     } catch (error) {
//         res.status(500).json({success:false, message:`bad requiest ${error.message}`})
        
//     }

//  }