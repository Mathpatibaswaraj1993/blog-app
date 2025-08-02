import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Blogs() {
  const { blogs } = useAuth(); // ✅ FIXED

  // const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");

  return (
    <div className="container mx-auto px-4 py-10 bg-orange-300">
      <h1 className="text-2xl font-semibold mb-6 text-center shadow-lg text-pink-900 rounded-lg">
        All Blogs goes here!!
      </h1>
      <p className="text-center mb-8">
        The concepts of gods varies widely across different
        cultures,religious,and belief Systems
      </p>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.slice(0, 10).map((element) => (
              <Link
                to="/"
                key={element?._id || Math.random()}
                className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                {/* Blog Image */}
                <div className="relative h-56">
                  <img
                    src={element?.blogImage?.url || "/fallback.jpg"}
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  {/* Title */}
                  <h1 className="absolute bottom-4 left-4 text-white text-lg font-bold group-hover:text-yellow-400 transition-colors duration-300">
                    {element?.title || "Untitled"}
                  </h1>
                </div>

                {/* Author Info */}
                <div className="p-6 flex items-center">
                  <img
                    src={element?.adminPhoto}
                    alt="Author"
                    className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {element?.adminName || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">New</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No blogs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
