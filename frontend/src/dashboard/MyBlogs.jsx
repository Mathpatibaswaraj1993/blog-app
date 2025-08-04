import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate(); // ✅ initialize navigate
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(`${api}/api/blogs/my-blog`, {
          withCredentials: true,
        });
        setMyBlogs(Array.isArray(data) ? data : data.blogs || []);
      } catch (error) {
        console.log("❌ API Error:", error.response?.data || error.message);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${api}/api/blogs/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Blog deleted Successfully!!");
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to delete blog!!");
    }
  };

  return (
    <div className="container mx-auto px-0 py-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ml-56">
        {Array.isArray(myBlogs) && myBlogs.length > 0 ? (
          myBlogs.slice(0, 12).map((element) => (
            <div
              key={element?._id || Math.random()}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden ml-4 py-4"
            >
              {/* Only image/title wrapped in Link */}
              <Link to={`/blogs/${element._id}`}>
                <div className="relative h-56 w-full shadow-lg group cursor-pointer">
                  <img
                    src={element?.blogImage?.url || "/fallback.jpg"}
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  <h1 className="absolute bottom-2 left-2 text-white text-lg font-bold hidden group-hover:block transition-opacity duration-300">
                    {element?.title || "Untitled"}
                  </h1>
                </div>
              </Link>

              {/* Author Info */}
              <div className="mt-4 px-4 flex items-center gap-3 shadow hover:bg-green-500 py-3 bg-orange-400">
                <img
                  src={element?.adminPhoto || "/fallback-user.jpg"}
                  alt="Author"
                  className="w-10 h-10 rounded-full border-2 border-green-400 object-cover"
                />
                <div>
                  <p className="text-md font-semibold text-blue-800">
                    {element?.adminName || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">New</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-center space-x-4 bg-teal-500">
                <Link
                  to={`/update/${element._id}`}
                  className="text-white bg-green-600 rounded-md shadow px-4 py-1 border border-gray-600 hover:underline"
                >
                  UPDATE
                </Link>
                <button
                  onClick={() => handleDelete(element._id)}
                  className="text-white bg-red-600 rounded-md shadow px-4 py-1 border border-gray-400 hover:underline"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No blogs found.
          </div>
        )}
      </div>
      <div className="text-center mt-5">
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

export default MyBlogs;
