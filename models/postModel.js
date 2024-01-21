const mongoose = require("mongoose");

const postModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Title"],
    },
    pic: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=996&t=st=1705728530~exp=1705729130~hmac=d771074940f83a359b8c37b6b0bec981aa5950b6cf04604ac5ac226c84ab5dff",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postModel);

module.exports = Post;
