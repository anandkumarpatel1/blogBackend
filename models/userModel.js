const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your E-mail"],
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    password: {
      type: String,
      required: [true, "Please Enter your E-mail"],
    },
    pic: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=996&t=st=1705728530~exp=1705729130~hmac=d771074940f83a359b8c37b6b0bec981aa5950b6cf04604ac5ac226c84ab5dff",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);

module.exports = User;
