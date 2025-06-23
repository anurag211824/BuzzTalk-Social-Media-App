import jwt from "jsonwebtoken";
import User from "../models/User.js";
// 1.UserRegistration Logic
const registerUser = async (req, res) => {
  const { username, fullname, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ username, fullname, email, password });
    await user.save();
    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// 2.UserLogin Logic
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username: username });
    console.log(user);
    
    if (!user) return res.status(400).json({ messsge: "Invalid Credentials" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });
    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User loggedIn successfully",
      user,
    });
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// 3.UserProfile Login
const userProfile = async (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
};

export { registerUser, loginUser,userProfile };
