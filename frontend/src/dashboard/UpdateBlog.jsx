import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const api = import.meta.env.VITE_API_URL;

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${api}/api/blogs/single-blog/${id}`, {
          withCredentials: true,
        });
        console.log(data);

        toast.success(data.message || "Blog fetched successfully!");

        const blog = data;

        setTitle(blog?.title || "");
        setCategory(blog?.category || "");
        setAbout(blog?.about || "");
        setBlogImagePreview(blog?.blogImage?.url || "");
      } catch (error) {
        console.log(error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to fetch blog");
      }
    };

    fetchBlog();
    console.log("Update page loaded with blog ID:", id); // 👈 check this
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    if (blogImage instanceof File) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `${api}/api/blogs/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message || "Blog updated successfully!");
      navigateTo("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-orange-300 shadow-lg rounded-2xl">
      <h1 className="text-xl font-bold mb-4 text-center">Update Blog</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="border p-2 w-full mb-4"
        />
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="About"
          className="border p-2 w-full mb-4"
        />
        <input
          type="file"
          onChange={changePhotoHandler}
          className="mb-4 border border-black h-10"
        />
        {blogImagePreview && (
          <img
            src={blogImagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover mb-4"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default UpdateBlog;
