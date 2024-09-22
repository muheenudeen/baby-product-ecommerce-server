import User from "../../../Model/userSchema/userSchema.js";
import { bcryptData } from "../../../Utils/bcrypt.js";

// Registration
const signUp = async (req, res) => {
    try {
        const { fname, sname, email, password, address, city, state, pincode, contact } = req.body;

        const emailChecking = await User.findOne({ email });
        if (emailChecking) {
            return res.status(400).json({
                success: false,
                message: "Email already exists...",
            });
        }

        const hashedPassword = await bcryptData.hashedPassword(password);

        const user = new User({
            fname,
            sname,
            email,
            password: hashedPassword,
            address,
            city,
            state,
            pincode,
            contact,
        });

        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


   //login

   const login = async (req,res)=>{
    try {
        const {email ,password} = req.body;
        const user = await userSchema.findOne({ email });

        if(!user){
            return res.status(400).json({
                success:false,
            })
        }
        
    } catch (error) {
        
    }
   }


   export const userController = {
    signUp,
};
