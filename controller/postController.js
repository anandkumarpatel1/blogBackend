const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { title, pic } = req.body;

    if (!title) {
      res.status(400).json({
        success: false,
        message: "Please Enter Title",
      });
      return;
    }

    if (!req.user) {
      res.status(400).json({
        success: false,
        message: "Please login again",
      });
      return;
    }

    const post = await Post.create({
      title,
      pic,
      admin: req.user._id,
    });

    req.user.posts.push(post?._id);

    await req.user.save();
    res.status(201).json({
      success: true,
      message: "Post created successfull",
      post,
      user: req.user,
    });
    return;
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const allPosts = async (req, res) => {
    const posts = await Post.find({}).populate("admin", "-password")

    res.status(200).json({
        success: true,
        postsLen: posts.length,
        posts: posts.reverse()
    })
  try {
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { createPost, allPosts };
