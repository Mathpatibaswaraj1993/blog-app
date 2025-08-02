import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth(); // ✅ FIXED
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-wide">
        🔥 Trending Blogs
      </h1>

      {Array.isArray(blogs) && blogs.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="px-2"
        >
          {blogs.slice(0, 4).map((element) => (
            <Link
              to={`/blog/${element._id}`}
              key={element?._id}
              className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-300 group"
            >
              {/* Blog Image Section */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={element?.blogImage?.url || "/fallback.jpg"}
                  alt={element?.title || "Blog"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <h2 className="absolute bottom-4 left-4 text-white text-lg font-bold group-hover:text-yellow-400">
                  {element?.title || "Untitled"}
                </h2>
              </div>

              {/* Author Info Section */}
              <div className="flex items-center gap-4 p-4 bg-amber-300">
                <img
                  src={element?.adminPhoto || "/default.png"}
                  alt="Author"
                  className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
                />
                <div>
                  <p className="text-md font-semibold text-gray-800">
                    {element?.adminName || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-500">New</p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      ) : (
        <div className="flex h-screen items-center justify-center">
          Loading .....
        </div>
      )}
    </div>
  );
}

export default Trending;
