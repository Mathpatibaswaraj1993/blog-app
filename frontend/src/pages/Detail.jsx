import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const navigate = useNavigate(); // ✅ initialize navigate
  const api = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${api}/api/blogs/single-blog/${id}`, {
          withCredentials: true,
        });
        console.log("Fetched blog:", data);
        console.log("Admin photo URL:", data?.adminPhoto);
        setBlogs(data);
        toast.success(data.message || "Blog fetched successfully!");
      } catch (error) {
        console.log(error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to fetch blog");
      }
    };

    fetchBlogs();
  }, [id]);

  return (
    <div className="bg-amber-300 ">
      <div>
        {blogs && (
          <section className="container mx-auto p-4">
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {blogs?.category}
            </div>
            <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>

            {/* Admin Info */}
            <div className="flex items-center mb-4">
              <img
                src={blogs?.adminPhoto || "/default-avatar.png"}
                alt="avatar_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold">{blogs?.adminName}</p>
            </div>

            {/* Blog Image and Description */}
            <div className="flex flex-col md:flex-row">
              {blogs?.blogImage && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full h-[300px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6">{blogs?.about}</p>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* ✅ Home Button using navigate */}
      <div className="text-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Detail;
