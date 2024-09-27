import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minlength: 3

  },
  sname: {
    type: String,

  },
  email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
    minlength: 6,
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
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderSchemas",

    },
  ],
    wishlists: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wishListSchemas",

    },

  
});

const User = mongoose.model("User", userSchema);

export default User;
