import React, { useEffect, useState } from "react";
import axios from "axios";

function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/users/admins",
          {
            withCredentials: true,
          }
        );
        console.log("Fetched admins:", data?.admins);
        setAdmin(data?.admins || []);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 bg-slate-400">
        <h1 className="text-2xl font-semibold mb-6">Popular Creators</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(admin) && admin.length > 0 ? (
            admin.slice(0, 4).map((element) => {
              // ✅ Log outside JSX
              console.log("Photo object for element:", element.photo.url);

              return (
                <div
                  key={element?._id || Math.random()}
                  className="flex flex-col items-center"
                >
                  {/* Admin Photo */}
                  <div className="relative">
                    <img
                      src={
                        typeof element.photo.url === "string"
                          ? element.photo?.url
                          : element.photo?.url || "/fallback.jpg"
                      }
                      alt="Admin"
                      className="w-40 h-40 object-cover rounded-full border border-black shadow"
                    />
                  </div>
                  {/* Name and Role */}
                  <div className="text-center mt-2">
                    <p className="text-gray-600 text-sm font-semibold">
                      {element.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {element.role}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No creators found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Creator;
