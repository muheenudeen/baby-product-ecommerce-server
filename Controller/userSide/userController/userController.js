const User = require("../models/userSchema");

const signUp = async (req, res) => {
    try {
        const user = new User(req.body); // Use lowercase 'user' for the instance
        await user.save(); // Save the user to the database
        res.status(201).json(user); // Send the saved user as a response
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
};

module.exports = {
    signUp
};
