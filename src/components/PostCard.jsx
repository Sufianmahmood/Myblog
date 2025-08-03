import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, feauturedImage }) {
  const imageUrl = feauturedImage
    ? appwriteService.getFilePreview(feauturedImage)?.href
    : null;

  // 🧪 Debug logs
  console.log("🧪 PostCard image ID:", feauturedImage);
  console.log("🧪 Image URL:", imageUrl);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl p-4 shadow hover:shadow-md transition">
        <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/no-image.png"; // Fallback image
                e.target.onerror = null;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
              No Image Available
            </div>
          )}
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
