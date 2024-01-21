const User = require("../models/userModel");
const generateToken = require("../middleWare/generateToken");

//register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please proive all details",
      });

      return;
    }

    // checking existingUser
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User is already please enter a valid email",
      });
      return;
    }

    //creating user
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(200).json({
        success: true,
        message: `Welcome ${user.name}`,
        token,
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all details",
      });

      return;
    }

    //checking user is existing or not
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User is not exists",
      });
      return;
    }

    //checking password
    if (password !== user?.password) {
      res.status(400).json({
        success: false,
        message: "User Credentials are invalid",
      });
      return;
    }
    
    const token = generateToken(user?._id)

    res.status(200).json({
        success: true,
        message: `Welcome ${user.name}`,
        token,
        user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { registerUser, loginUser };
