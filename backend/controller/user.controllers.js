import { cloudinary } from "../index.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../Jwt/AuthToken.js";
const router = express.Router()
import express from "express"
import jwt from "jsonwebtoken";


// ✅ REGISTER
export const register = async (req, res) => {
  try {
    // Check file
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: "User Photo is required" });
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only JPG, PNG, and WEBP are allowed.",
      });
    }

    const { name, email, phone, password, education, role } = req.body;
    if (!email || !name || !phone || !password || !education || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary Upload Error:", JSON.stringify(cloudinaryResponse.error, null, 2));
      return res.status(500).json({ message: "Image upload failed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      phone,
      password: hashedPassword,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    await newUser.save();
    const token = await createTokenAndSaveCookies(newUser._id, res);
     console.log("Signup:", token);
     
    res.status(201).json({
      message: "User Register Successfully!!",
      newUser,
      token,
    });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
        console.log("Login Request Received:", email, role); // ✅ Add this
      return res.status(400).json({ message: "Please fill required fields !!" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: `Given role '${role}' not matched` });
    }

    const token = await createTokenAndSaveCookies(user._id, res);

    res.status(200).json({
      message: "User logged in Successfully !!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};


// LOGOUT
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: false,
      sameSite: "none",
      secure: true, // true in production
    });
    console.log("Cookies:", req.cookies);

    return res.status(200).json({ message: "User logged out successfully!" });
  } catch (error) {
    console.error("Logout error:", error);
    console.log(error);
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




//Get User profile
export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json(user)
}

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admins }); // 👈 now returns { admins: [...] }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};