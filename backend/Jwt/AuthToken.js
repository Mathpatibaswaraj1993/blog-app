import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d", // ✅ no space
  });

  res.cookie("jwt", token, {
    httpOnly: false,
    sameSite: "none",
    secure: true,
    maxAge:7 * 24 * 60 * 60 * 1000,
 })

  // Optional: save token in DB (if you're tracking active tokens)
  await User.findByIdAndUpdate(userId, { token });

  return token; // ✅ don't send response here
};

export default createTokenAndSaveCookies;
