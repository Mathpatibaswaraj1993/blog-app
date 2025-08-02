import { Blog } from "../models/blog.model.js"
import { cloudinary } from "../index.js";
import mongoose from "mongoose";


//create blog

export const createBlog = async (req, res) => {
  try {
    // Check file
    if (!req.files || !req.files.blogImage) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only JPG, PNG, and WEBP are allowed.",
      });
    }

    const { title,category,about } = req.body;
      if (!title ||
          !category ||
          !about) {
      return res.status(400).json({ message: "title,category & about are required fields" });
    }

      const adminName = req?.user?.name;
      const adminPhoto = req?.user?.photo?.url;
      const createdBy = req?.user?._id
      
      

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary Upload Error:", JSON.stringify(cloudinaryResponse.error, null, 2));
      return res.status(500).json({ message: "Image upload failed" });
    }

    const blogData ={
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    };

   const blogs= await Blog.create(blogData);

    res.status(201).json({
      message: "Blog created Successfully!!",
      blogs,
    });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Delete blog

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully!" });
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



//Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs }); // ✅ rename to match frontend expectations
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error });
  }
};



//Get single blog

export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  console.log("Requested blog ID:", id);


  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog ID format" });
  }

  try {
    const blog = await Blog.findById(id)
    console.log("Fetched blog:", blog);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
};


export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;

try {
    const myBlogs = await Blog.find({ createdBy });
    res.status(200).json(myBlogs);
} catch (error) {
  console.log(error);
}

}

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const { title, category, about } = req.body;
    const updatedFields = { title, category, about };

    // ✅ If new image is uploaded
    if (req.files && req.files.blogImage) {
      const blogImage = req.files.blogImage;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedFormats.includes(blogImage.mimetype)) {
        return res.status(400).json({
          message: "Invalid image format. Use JPG, PNG, or WEBP only",
        });
      }

      // ✅ Upload to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return res.status(500).json({ message: "Image upload failed" });
      }

      updatedFields.blogImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    // ✅ Update blog in MongoDB
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not Found!" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
