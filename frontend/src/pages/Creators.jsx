import React, { useEffect, useState } from "react";
import axios from "axios";

function Creators() {
  const [creators, setCreators] = useState([]); // ✅ lowercase 'creators'
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          `${api}/api/users/admins`,
          {
            withCredentials: true, // ✅ Fixed typo
          }
        );

        console.log("Fetched Data:", data);

        // ✅ Check if data.admins is the array you want
        if (Array.isArray(data.admins)) {
          setCreators(data.admins); // ✅ Correctly set state
        } else {
          console.error("Expected admins to be an array");
        }
      } catch (err) {
        console.error("Failed to fetch creators:", err);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div className="flex flex-wrap justify-center my-20 bg-gray-400 mt-6">
      {Array.isArray(creators) &&
        creators.map((creator) => (
          <div
            key={creator._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2"
          >
            <div className="relative">
              <img
                src={creator.photo?.url || "/default-avatar.png"}
                alt="avatar"
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={creator.photo?.url || "/default-avatar.png"}
                alt="avatar"
                className="w-14 h-16 rounded-full mx-auto border-4 border-gray-700"
              />
            </div>
            <div className="px-4 py-6 mt-4">
              <h2 className="text-center text-xl font-semibold text-gray-800">
                {creator.name}
              </h2>
              <p className="text-center text-gray-600 mt-2">{creator.email}</p>
              <p className="text-center text-gray-600 mt-2">{creator.phone}</p>
              <p className="text-center text-gray-600 mt-2">{creator.role}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Creators;
