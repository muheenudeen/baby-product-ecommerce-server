import User from "../../Model/userSchema/userSchema.js";
import generateToken from "../../Utils/jwt.js";
import { bcryptData } from "../../Utils/bcrypt.js";


// signup
const signUp = async (req, res) => {
    try {
        // console.log("Request body:", req.body);

        const { fname, sname, email, password, address, city, state, pincode, contact, role } = req.body;

        const emailChecking = await User.findOne({ email });
        if (emailChecking) {
            return res.status(400).json({
                success: false,
                message: "Email already exists...",
            });
        }

        // console.log("Email is unique");

        const hashedPassword = await bcryptData.hashedPassword(password);
        console.log("Hashed password:", hashedPassword);

        const user = new User({
            fname,
            sname,
            email,
            password: hashedPassword,
            role:role || "user",
            address,
            city,
            state,
            pincode,
            contact,

        });

        
        await user.save();
        // console.log("User saved successfully:", user);

        res.status(200).json(user);
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



//login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found. create new account",

            })
        }

        const comparePassword = await bcryptData.comparePassword(password, user.password);
        if (!comparePassword) {
            return res
                .status(401)
                .json({ success: false, message: "incorrect password" })



        }
        const token = generateToken(user.id)

        res.status(200).json({
            success: true,
            data: user,
            token,
        })

        if(user ?.role === "admin"){
            res.status(200).json({success:true, message:"admin login successfull"})
        }else{
            res.status(200).json({success:true, message:"user login successfull"})
        }

    } catch (error) {
        res.status(500)
            .json({ success: false, message: `Server error. Please check your request ${error.message}` })

    }
}

//logout

const logout = (req, res) => {
    try {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        res.status(200).json({
            success: true,
            message: "logged out",
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: `${error.message}`
        })

    }
}

export const authController = {
    signUp,
    login,
    logout,
};
