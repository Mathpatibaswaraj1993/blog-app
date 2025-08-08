import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const app = express();

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js"

//middleware
app.use(express.json());
// app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "tmp/" }));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // required for cookies
  }));


    // define routes
   app.use("/api/users", userRoute);
    app.use("/api/blogs", blogRoute);
  

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export { cloudinary };

const PORT = process.env.PORT || 5000;

const connectDBAndStartServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");

 
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDBAndStartServer();
