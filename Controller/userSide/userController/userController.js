import User from "../../../Model/userSchema/userSchema.js";
import { bcryptData } from "../../../Utils/bcrypt.js";

const signUp = async (req, res) => {
    try {
        

        const user = new User ({
            fname:req.body.fname,
            sname:req.body.sname,
            email:req.body.email,
            password:bcryptData.hashedPassword,
        })

        const existingUser = await userSchema.findOne({email})
        if(existingUser){
            return res
            .status(400)
            .json({success:false , message:"Email already exist..."})
        }

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "typing error"});
    }
};

export const userController = {
    signUp
}
