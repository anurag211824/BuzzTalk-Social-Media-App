import jwt from "jsonwebtoken";
import User from "../models/User.js";
const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token,  process.env.JWT_SECRET);
      // 👤 Fetch user from DB using ID
    const user = await User.findById(decoded.id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔧 Attach full user object to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default auth;
