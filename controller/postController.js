const Post = require("../models/postModel");
const { route } = require("../routes/userRouter");

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
  const posts = await Post.find({}).populate("admin", "-password");

  res.status(200).json({
    success: true,
    postsLen: posts.length,
    posts: posts.reverse(),
  });
  try {
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const deleteUserPost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Post Id",
      });
    }

    const exists = req.user.posts.includes(id);
    if (!exists) {
      return res.status(400).json({
        success: false,
        message: "You are not able to delete this post",
      });
    }

    const index = req.user.posts.indexOf(id);
    req.user.posts.splice(index, 1);

    const post = await Post.findOneAndDelete({ _id: id });
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not deleted",
      });
    }

    await req.user.save();
    res.status(201).json({
      success: true,
      message: "Post deleted Successfully",
      post: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const editUserPost = async (req, res) => {
  try {
    const { id } = req.params;
    const {title, pic} = req.body;

    if(!title){
      return res.status(400).json({
        success: false,
        message: "Please Provide New Title",
      });
    }
    if(!pic){
      return res.status(400).json({
        success: false,
        message: "Please Provide New Pic",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Post Id",
      });
    }

    const exists = req.user.posts.includes(id);
    if (!exists) {
      return res.status(400).json({
        success: false,
        message: "You are not able to edit this post",
      });
    }

    const post = await Post.findOneAndUpdate({ _id: id }, { title: title, pic: pic });

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not deleted",
      });
    }

    await post.save()

    res.status(201).json({
      success: true,
      message: "Post Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { createPost, allPosts, deleteUserPost, editUserPost };
