import { useLoaderData, Link } from "react-router-dom";
import {
  FaThumbsUp,
  FaRegComment,
  FaUserCircle,
  FaHeart,
  FaLaugh,
  FaSurprise,
  FaSadTear,
  FaAngry,
} from "react-icons/fa";
import { useState } from "react";

const Announcements = () => {
  const announcements = useLoaderData();
  console.log("Announcements:", announcements);
  const [reactions, setReactions] = useState({});
  const [showReactions, setShowReactions] = useState(null);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});

  if (!announcements) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No announcements available.
      </div>
    );
  }

  const getMediaType = (file) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const videoExtensions = [".mp4", ".webm", ".ogg"];
    const lowerCaseFile = file.toLowerCase();

    if (imageExtensions.some((ext) => lowerCaseFile.endsWith(ext))) {
      return "image";
    } else if (videoExtensions.some((ext) => lowerCaseFile.endsWith(ext))) {
      return "video";
    }
    return "unknown";
  };

  const formatDate = (datetime) => {
    return datetime ? datetime.split("T")[0] : "Just Now";
  };

  const handleReaction = (postId, reaction) => {
    setReactions((prev) => ({ ...prev, [postId]: reaction }));
    setShowReactions(null);
  };
  const handleToggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };
  const handleCommentChange = (postId, text) => {
    setNewComments((prev) => ({ ...prev, [postId]: text }));
  };

  const handleAddComment = (postId) => {
    if (!newComments[postId]) return;

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComments[postId]],
    }));
    setNewComments((prev) => ({ ...prev, [postId]: "" }));
  };
  const [showAllMedia, setShowAllMedia] = useState(false);

  // Function to determine the grid layout based on the number of media items
  const getGridClass = (mediaLength) => {
    if (mediaLength === 1) return "grid-cols-1"; // Full width for 1 media
    if (mediaLength === 2 || mediaLength === 3) return "grid-cols-2"; // 2 columns for 2 or 3 media
    return "grid-cols-2"; // Default to 2 columns for 4 or more media
  };

  // Function to determine if media should be hidden
  const shouldHideMedia = (index, mediaLength) => {
    return !showAllMedia && mediaLength > 4 && index >= 3; // Hide media beyond the 3rd item
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      {announcements.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <FaUserCircle className="text-gray-500 text-3xl mr-2" />
            <div>
              <p className="font-bold">{post?.creator || "Unknown"}</p>
              <p className="text-xs text-gray-400">
                {formatDate(post?.created_at)}
              </p>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-1">
            {post?.title || "Untitled"}
          </h2>
          <p className="text-gray-700">
            {post?.text || "No description available."}
          </p>

          <>
      {post.media && post.media.length > 0 && (
        <div className={`grid ${getGridClass(post.media.length)} gap-2 mt-3`}>
          {post.media.map((media, index) => {
            if (shouldHideMedia(index, post.media.length)) return null; // Skip rendering hidden media

            const mediaType = getMediaType(media.media_file);
            return (
              <div key={media.id} className="rounded-lg overflow-hidden">
                {mediaType === "image" ? (
                  <img
                    src={media.media_file}
                    alt="Media"
                    className="w-full object-cover rounded-md"
                  />
                ) : mediaType === "video" ? (
                  <video controls className="w-full rounded-md">
                    <source src={media.media_file} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p className="text-xs text-gray-500">Unsupported media type</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Show "More" button if there are more than 4 media items */}
      {post.media && post.media.length > 4 && !showAllMedia && (
        <button
          onClick={() => setShowAllMedia(true)}
          className="mt-2 text-sm text-blue-500 hover:underline"
        >
          Show More
        </button>
      )}
    </>

          <div className="flex justify-between items-center mt-3 border-t pt-2 text-gray-600 text-sm">
            <div className="relative">
              <button
                className="flex items-center space-x-1 hover:text-blue-500"
                onClick={() => setShowReactions(post.id)}
              >
                {reactions[post.id] ? reactions[post.id].icon : <FaThumbsUp />}
                <span>
                  {reactions[post.id] ? reactions[post.id].label : "Like"}
                </span>
              </button>
              {showReactions === post.id && (
                <div className="absolute -top-10 left-0 flex space-x-2 bg-white shadow-md p-2 rounded-lg">
                  {[
                    {
                      icon: <FaThumbsUp className="text-blue-500" />,
                      label: "Like",
                    },
                    {
                      icon: <FaHeart className="text-red-500" />,
                      label: "Love",
                    },
                    {
                      icon: <FaLaugh className="text-yellow-500" />,
                      label: "Haha",
                    },
                    {
                      icon: <FaSurprise className="text-orange-500" />,
                      label: "Wow",
                    },
                    {
                      icon: <FaSadTear className="text-blue-400" />,
                      label: "Sad",
                    },
                    {
                      icon: <FaAngry className="text-red-600" />,
                      label: "Angry",
                    },
                  ].map((r, index) => (
                    <button
                      key={index}
                      onClick={() => handleReaction(post.id, r)}
                    >
                      {r.icon}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="flex items-center space-x-1 hover:text-blue-500"
              onClick={() => handleToggleComments(post.id)}
            >
              <FaRegComment />
              <span>Comment</span>
            </button>
          </div>

          <div className="mt-3">
            {comments[post.id]?.map((comment, index) => (
              <p key={index} className="text-sm text-gray-600 border-b pb-1">
                {comment}
              </p>
            ))}
            <div className="flex mt-2">
              <input
                type="text"
                value={newComments[post.id] || ""}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                placeholder="Write a comment..."
                className="border rounded-md p-1 flex-1"
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
