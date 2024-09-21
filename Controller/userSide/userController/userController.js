import bcrypt from "bcryptjs"
import User from "../../../Model/userSchema/userSchema.js";


const signUp = async (req, res) => {
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        const user = new User ({
            fname:req.body.fname,
            sname:req.body.sname,
            email:req.body.email,
            password:hashedPassword
        })

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
};

export const userController = {
    signUp
}
