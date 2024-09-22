import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minlength: 6,
  },
  sname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  profileImg: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  contact: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
