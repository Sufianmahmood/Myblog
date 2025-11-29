import React from "react";
import { useSelector } from "react-redux";

function ProfilePage() {
  const user = useSelector((state) => state.auth.userData);

  if (!user) return <div className="p-5 text-center">No user logged in</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <div className="space-y-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.$id}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
