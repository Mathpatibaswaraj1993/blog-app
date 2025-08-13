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
    <div className="min-h-screen flex items-center justify-center bg-slate-500">
      <div className="w-full max-w-md bg-orange-300 shadow-md rounded-lg p-8">
        <form onSubmit={handleRegister}>
          <div className="font-semibold text-xl items-center text-center">
            Cilli<span className="text-blue-500">Blog</span>
          </div>
          <h1 className="text-xl font-semibold mb-6">Login</h1>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md bg-dark"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="mb-4">
            <input
              type="email"
              placeholder=" Your Email Address Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder=" Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <p className="text-center mb-4">
            New User?{" "}
            <Link to="/register" className="text-blue-600">
              Register Now{" "}
            </Link>
          </p>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-500 duration-300 rounded-md text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
