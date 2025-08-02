import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();
  console.log("Blogs in Hero:", blogs);
  // console.log("Admin Photo URL:", adminPhoto);

  return (
    <div className="container mx-auto px-4 py-10 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.slice(0, 17).map((element) => (
            <Link
              to={`/blog/${element._id}`}
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
              <div className="p-6 flex items-center bg-teal-300">
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
          <div className="flex h-screen items-center justify-center">
            Loading .....
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
