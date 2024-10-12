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
            role: role || "user",
            address,
            city,
            state,
            pincode,
            contact,

        });


        await user.save();
        // console.log("User saved successfully:", user);

        res.status(200).json({ success: true, message: "User registered successfully", user,});
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ success: false, message: "Internal server error" });

    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found. Please create a new account",
            });
        }

        // Compare the provided password with the user's hashed password
        const comparePassword = await bcryptData.comparePassword(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Generate a token for the user
        const token = generateToken(user._id);

        // Send success response with token
        const message = user.role === "admin"
            ? "Admin login successful"
            : "User login successful";

        return res.status(200).json({
            success: true,
            data: user,
            token,
            message,
        });

    } catch (error) {
        // Handle server error
        return res.status(500).json({
            success: false,
            message: `Server error. Please check your request: ${error.message}`,
        });
    }
};


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
