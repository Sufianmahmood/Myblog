import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, feauturedImage }) {

  const imageUrl = feauturedImage
    ? appwriteService.getFilePreview(feauturedImage)?.href
    : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition">

        {/* Avatar + Content */}
        <div className="flex gap-4">

          {/* Avatar Circle */}
          <div>
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>

          {/* Post Content */}
          <div className="flex-1">

            {/* Title (Tweet text) */}
            <h2 className="text-[17px] font-medium text-gray-800 mb-2">
              {title}
            </h2>

            {/* Featured Image */}
            {imageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src = "/no-image.png";
                  }}
                />
              </div>
            )}


          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
