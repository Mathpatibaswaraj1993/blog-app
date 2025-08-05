import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"; // ✅ ES6

//Authentication
export const isAuthenticated = async (req, res, next) => {
  try {
      const token = req.cookies.jwt;
    console.log("middleware token:", token);
    console.log("Cookies from client:", req.cookies);
    
    
      console.log("Cookies:", req.cookies);
      console.log("Token:", req.cookies.jwt);

    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    return res.status(401).json({ error: "User not authenticated!" });
  }
};

//Authorization

export const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({error:`User with given role ${req.user.role} does not exist`})
        }
        next();        
    }
}


