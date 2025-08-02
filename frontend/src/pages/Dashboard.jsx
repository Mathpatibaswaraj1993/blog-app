import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import SideBar from "../dashboard/SideBar";
import MyProfile from "../dashboard/MyProfile";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import MyBlogs from "../dashboard/MyBlogs";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("MyBlogs");
  if (profile) {
    console.log("Profile Loaded", profile); // ✅ Correct usage
  }

  console.log("Authenticated:", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="bg-pink-500">
      <SideBar component={component} setComponent={setComponent} />
      {component === "MyProfile" ? (
        <MyProfile />
      ) : component === "CreateBlog" ? (
        <CreateBlog />
      ) : component === "UpdateBlog" ? (
        <UpdateBlog />
      ) : (
        <MyBlogs />
      )}
      {/* <div>Dashboard</div> */}
    </div>
  );
}

export default Dashboard;
