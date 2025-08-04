import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const api = import.meta.env.VITE_API_URL;

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const response = await axios.post(`${api}/api/blogs/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success(response.data.message || "Blog created successfully!");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Please fill required fields"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleCreateBlog}>
          <div className="font-semibold text-xl text-center mb-2">
            Cilli<span className="text-blue-500">Blog</span>
          </div>
          <h1 className="text-xl font-semibold mb-6 text-center">
            Create Blog
          </h1>

          <div className="mb-4">
            <div>Title</div>
            <input
              type="text"
              placeholder="Enter Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <div>Category</div>
            <input
              type="text"
              placeholder="Blog Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <div>BlogImage:</div>&nbsp;
            {blogImagePreview && (
              <div className="w-20 h-20 mr-4">
                <img
                  src={blogImagePreview}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            <input
              key={blogImagePreview}
              type="file"
              accept="image/*"
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <div>About</div>
            <textarea
              placeholder="About Blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <p className="text-center mb-4">
            Want to go back?{" "}
            <Link to="/" className="text-blue-600">
              Home
            </Link>
          </p>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 transition duration-300 rounded-md text-white"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
