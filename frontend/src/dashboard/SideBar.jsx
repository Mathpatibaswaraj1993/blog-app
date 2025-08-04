import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";

function SideBar({ setComponent }) {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);
  const api = import.meta.env.VITE_API_URL;


  console.log(profile);

  const handleComponents = (value) => {
    setComponent(value);
    setShow(false); // hide mobile menu after click
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${api}/api/users/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success(data.message || "Logged out successfully");
    } catch (error) {
      console.log("Logout error:", error);
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Burger Icon for Mobile */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-3xl text-white" />
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 h-screen shadow-lg fixed top-0 left-0 bg-gray-700 text-white transition-transform duration-300 transform z-40 sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        {/* Close Button on Mobile */}
        <div
          className="sm:hidden absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={() => setShow(false)}
        >
          <BiSolidLeftArrowAlt />
        </div>

        {/* Sidebar Content */}
        {isAuthenticated && profile && (
          <>
            <div className="text-center py-6">
              {profile.photo ? (
                <img
                  src={profile.photo?.url}
                  alt="User Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-2"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-500 mx-auto mb-2" />
              )}
              <p className="text-lg font-semibold">{profile.name}</p>
            </div>

            <ul className="space-y-4 px-4">
              <li>
                <button
                  onClick={() => handleComponents("MyBlogs")}
                  className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-800 transition"
                >
                  MY BLOGS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleComponents("CreateBlog")}
                  className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-800 transition"
                >
                  CREATE BLOG
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleComponents("MyProfile")}
                  className="w-full px-4 py-2 bg-pink-600 rounded hover:bg-pink-800 transition"
                >
                  MY PROFILE
                </button>
              </li>
              <li>
                <button
                  onClick={gotoHome}
                  className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-800 transition"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-700 transition"
                >
                  LOGOUT
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default SideBar;
