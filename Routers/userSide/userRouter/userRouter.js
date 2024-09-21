const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: String,
    sname: String,
    email: String,
    password: String,  // This should be stored after hashing
    // No need to store confirmpassword in the schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
