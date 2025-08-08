import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();
const api = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null); // null initially
  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${api}/api/users/my-profile`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      console.log(data.user);
      setProfile(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response?.data || error.message
      );
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${api}/api/blogs/all-blogs/`, {
        withCredentials: true,
      });
      console.log("Blogs API Response:", response.data);
      setBlogs(Array.isArray(response.data.blogs) ? response.data.blogs : []);
    } catch (error) {
      console.error(
        "Error fetching blogs:",
        error.response?.data || error.message
      );
    }
  };

  fetchProfile();
  fetchBlogs();
}, []);


  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
