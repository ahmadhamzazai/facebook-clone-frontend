import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BiLike, BiComment } from "react-icons/bi";
import { FaThumbsUp, FaHeart, FaLaughSquint } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import CommentSection from "./CommentSection";

const Reaction = ({ posts }) => {
  const { user } = useSelector((state) => state.auth);

  const [likes, setLikes] = useState(posts?.likes || []);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentCount, setCommentCount] = useState(
    posts?.comments?.length || 0
  );

  useEffect(() => {
    if (user && posts?.likes?.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, posts]);

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `https://facebook-clone-backend-production-e1fc.up.railway.app/api/post/like/${posts._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.liked) {
        setLikes((prev) => [...prev, user._id]);
        setLiked(true);
      } else {
        setLikes((prev) => prev.filter((id) => id !== user._id));
        setLiked(false);
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleCommentAdded = () => {
    setCommentCount((prev) => prev + 1);
  };

  return (
    <div className="bg-white dark:bg-[#242526] w-full rounded-lg shadow-sm mt-4">
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1">
          <div className="flex items-center -space-x-1 cursor-pointer">
            <FaThumbsUp className="text-blue-500 text-lg border-2 border-white dark:border-[#242526] rounded-full" />
            <FaHeart className="text-red-500 text-lg border-2 border-white dark:border-[#242526] rounded-full" />
            <FaLaughSquint className="text-yellow-500 text-lg border-2 border-white dark:border-[#242526] rounded-full" />
          </div>
          <span
            className="text-gray-600 hover:underline cursor-pointer dark:text-[#B0B3B8] text-sm ml-1"
            onClick={() => setShowCommentBox(true)}
          >
            {likes.length}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-600 dark:text-[#B0B3B8] text-sm">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => setShowCommentBox(true)}
          >
            {commentCount} {commentCount === 1 ? "comment" : "comments"}
          </span>
          <span className="hover:underline cursor-pointer">
            {posts?.shares?.length || 0} shares
          </span>
        </div>
      </div>

      <div className="flex justify-around py-2">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 p-2 rounded-lg flex-1 justify-center text-md font-semibold transition-colors duration-200 ${
            liked
              ? "text-blue-500 hover:bg-blue-50 dark:hover:bg-[#3A3B3C]"
              : "text-gray-700 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"
          }`}
        >
          <BiLike className={`text-lg ${liked ? "text-blue-500" : ""}`} />
          <span className="text-sm sm:text-base">
            {liked ? "Liked" : "Like"}
          </span>
        </button>

        <button
          onClick={() => setShowCommentBox(true)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex-1 justify-center text-gray-700 dark:text-[#B0B3B8] text-md font-semibold transition-colors duration-200"
        >
          <BiComment className="text-lg" />
          <span className="text-sm sm:text-base">Comment</span>
        </button>

        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex-1 justify-center text-gray-700 dark:text-[#B0B3B8] text-md font-semibold transition-colors duration-200">
          <PiShareFat className="text-lg" />
          <span className="text-sm sm:text-base">Share</span>
        </button>
      </div>

      {showCommentBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-[#242526] w-full max-w-lg max-h-[80vh] rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-4 py-2 border-b dark:border-[#3A3B3C]">
              <h2 className="text-lg font-semibold dark:text-white">
                Comments
              </h2>
              <button
                className="text-gray-500 hover:text-red-500 dark:text-white"
                onClick={() => setShowCommentBox(false)}
              >
                ✕
              </button>
            </div>
            <CommentSection
              postId={posts._id}
              initialComments={posts.comments}
              onCommentAdded={handleCommentAdded}
              setShowCommentBox={setShowCommentBox}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reaction;
