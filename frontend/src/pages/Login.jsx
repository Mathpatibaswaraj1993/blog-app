/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
const api = import.meta.env.VITE_API_URL;

function Login() {
  console.log(api);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthenticated, setIsAuthenticated, profile, setProfile } =
    useAuth();

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      // toast.error("Please fill all fields");
    }
    try {
      const { data } = await axios.post(
        `${api}/api/users/login`,
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      console.log(data);
      setProfile(data.user);
      toast.success(data.message || "User Logged successfully!!");
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      // console.log(error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Please fill required fields"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-10 border border-gray-200">
        <form onSubmit={handleRegister}>
          <div className="font-bold text-3xl text-center mb-6">
            Cilli<span className="text-indigo-600">Blog</span>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Login
          </h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none"
            />
          </div>

          <p className="text-center mb-6 text-gray-600">
            New User?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Register Now
            </Link>
          </p>

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition duration-300 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
