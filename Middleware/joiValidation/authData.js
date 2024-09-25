import jwt from 'jsonwebtoken'

const authData =async (req,res,next)=>{
    try {
        const generateToken = req.headers.authorization;

        if(!generateToken){
            return res.status(400).json({success:false, message:"no access"})
        }

        const generateTokenValidate = jwt.verify(generateToken,process.env.JWT_SECRET);

        if(!generateTokenValidate){
            return res.status(400).json({success:false, message:"token no valid"})

        }
        next();
        
    } catch (error) {
        res.status(500).json({success:false, message:`${error.message}`})
        
    }
}

export const authDatas = {
    authData,

}