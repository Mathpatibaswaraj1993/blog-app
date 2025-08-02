import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated, setProfile } =
    useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      setProfile(null); // ✅ Clear profile after logout
      toast.success(data.message || "Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      <nav className="shadow px-4 py-3 bg-teal-300">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-xl">
            Cilli<span className="text-blue-500">Blog</span>
          </div>

          {/* Desktop Navigation */}
          <div>
            <ul className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-blue-500">
                HOME
              </Link>
              <Link to="/blogs" className="hover:text-blue-500">
                BLOGS
              </Link>
              <Link to="/creators" className="hover:text-blue-500">
                CREATORS
              </Link>
              <Link to="/about" className="hover:text-blue-500">
                ABOUT
              </Link>
              <Link to="/contact" className="hover:text-blue-500">
                CONTACT
              </Link>
            </ul>
            <div className="md:hidden" onClick={() => setShow(!show)}>
              {show ? <IoMdClose size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            {isAuthenticated && profile?.role === "admin" && (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-3 py-2 rounded"
              >
                DASHBOARD
              </Link>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-3 py-2 rounded"
              >
                LOGIN
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        {show && (
          <div className="bg-white md:hidden">
            <ul className="flex flex-col h-screen items-center justify-center space-y-3">
              {["/", "/blogs", "/creators", "/about", "/contact"].map(
                (path, index) => (
                  <li key={index}>
                    <Link
                      to={path}
                      onClick={() => setShow(false)}
                      className="block hover:text-blue-500 text-lg"
                    >
                      {path === "/"
                        ? "HOME"
                        : path.replace("/", "").toUpperCase()}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
