import React from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  console.log(profile); // make sure it's an object, not array

  return (
    <div className="h-screen bg-green-800">
      <div className="flex justify-center items-center my-0 ml-40 bg-yellow-500">
        <div className="bg-white inset-shadow-lg rounded-full overflow-hidden max-w-xs w-full">
          <div className="relative">
            <img
              src={
                typeof profile.photo === "string"
                  ? profile.photo
                  : profile.photo?.url || "/default-avatar.png"
              }
              alt="avatar"
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 bg-pink-400">
              <img
                src={
                  typeof profile.photo === "string"
                    ? profile.photo
                    : profile.photo?.url || "/default-avatar.png"
                }
                alt="avatar"
                className="w-20 h-20 rounded-full mx-auto border-4 border-gray-700"
              />
            </div>
          </div>
          <div className="px-4 py-6 mt-8 bg-orange-400">
            <h2 className="text-center text-xl font-semibold text-gray-800">
              {profile.name}
            </h2>
            <p className="text-center text-gray-600 mt-2">{profile.email}</p>
            <p className="text-center text-gray-600 mt-2">{profile.phone}</p>
            <p className="text-center text-gray-600 mt-2">{profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
