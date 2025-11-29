import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import service from "../appwrite/config"; // Adjust path
import { Query } from "appwrite";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await service.getUser();
      if (userData) {
        setUser(userData);

        const posts = await service.getUserPosts(userData.$id);
        setPostCount(posts?.total || 0);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <p className="text-center py-4">Loading profile...</p>;

  return (
    <div className="bg-white border border-gray-300 p-5 rounded-2xl shadow-md">
      {/* TOP USER INFO */}
      <div className="flex gap-4 items-center">
        <FaUserCircle className="text-gray-400 text-8xl" />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{user.name || "User"}</h2>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* STATS */}
      <div className="mt-5 flex justify-between text-sm">
        <div className="text-center">
          <p className="text-lg font-bold">{postCount}</p>
          <p className="text-gray-500">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{new Date(user.$createdAt).getFullYear()}</p>
          <p className="text-gray-500">Joined</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{user.$id.slice(0, 5)}...</p>
          <p className="text-gray-500">User ID</p>
        </div>
      </div>

      {/* BIO */}
      <div className="mt-4 text-gray-700 text-sm">
        <p>
          Welcome back, <span className="font-medium">{user.name || user.email}</span> 👋
        </p>
      </div>
    </div>
  );
};

export default Profile;
