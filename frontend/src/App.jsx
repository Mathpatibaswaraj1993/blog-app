/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import Blogs from "../src/pages/Blogs";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Creators from "../src/pages/Creators";
import Dashboard from "../src/pages/Dashboard";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../src/context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";

function App() {
  const { isAuthenticated, setIsAuthenticated, profile } = useAuth();
  console.log(isAuthenticated);

  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].some(
    (path) => location.pathname.startsWith(path),
    console.log(location.pathname)
  );
  const auth = useAuth();
  const blogs = auth?.blogs || [];
  console.log(blogs);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarFooter && <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated === true ? <Home /> : <Navigate to={"/login"} />
            }
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/creators" element={<Creators />} />

          <Route
            path="/dashboard"
            element={
              isAuthenticated && profile?.role === "admin" ? (
                <Dashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* single page route */}
          <Route path="/blog/:id" element={<Detail />} />

          {/* update page route */}
          <Route path="/update/:id" element={<UpdateBlog />} />

          {/* Universal route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
