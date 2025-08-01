import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import profileImage from "../assets/user.png";

const CommentSection = ({
  postId,
  initialComments = [],
  onCommentAdded,
  setShowCommentBox,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState(initialComments);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://facebook-clone-backend-production-e1fc.up.railway.app/api/post/comments/${postId}`,
          {
            withCredentials: true,
          }
        );
        setAllComments(res.data);
      } catch (err) {
        console.error("Fetch comments error:", err);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `https://facebook-clone-backend-production-e1fc.up.railway.app/api/post/comment/${postId}`,
        { text: commentText },
        { withCredentials: true }
      );

      setAllComments((prev) => [...prev, res.data]);
      setCommentText("");
      toast.success(res.data.message);
      onCommentAdded?.();
      setShowCommentBox(false);
    } catch (err) {
      console.error("Comment error:", err);
    }
  };

  return (
    <>
      <div className="overflow-y-auto flex-1 px-4 py-3 space-y-3">
        {allComments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-100 dark:bg-[#3A3B3C] p-2 rounded-md flex items-start gap-3"
          >
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
              <img
                src={comment.user?.profilePicture || profileImage}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <div className="text-sm font-semibold dark:text-white">
                {comment.user?.firstName} {comment.user?.lastName}
              </div>
              <div className="text-sm text-gray-800 dark:text-blue-300">
                {comment.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleAddComment}
        className="flex items-center gap-2 p-3 border-t dark:border-[#3A3B3C]"
      >
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 p-2 border border-gray-300 dark:border-[#3A3B3C] rounded-md dark:bg-[#3A3B3C] dark:text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Comment
        </button>
      </form>
    </>
  );
};

export default CommentSection;
