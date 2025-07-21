import React from "react";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import Reaction from "./Reaction";
import User from "../assets/user.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const PostCard = ({ posts, onPostDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!posts) return null;

  const postDate = new Date(posts?.createdAt).toLocaleString();

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/delete-post/${posts._id}`, {
        withCredentials: true,
      });

      toast.success("Post deleted successfully");
      onPostDelete(posts._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
    }
  };

  return (
    <div className="bg-white rounded-xl dark:bg-[#252728] shadow">
      <div className="flex justify-between p-4">
        <div className="flex gap-3">
          <div
            onClick={() => navigate(`/profile/${user._id}`)}
            className="w-[30px] cursor-pointer h-[30px] sm:w-[40px] sm:h-[40px] overflow-hidden rounded-full"
          >
            <img
              src={posts?.user?.profilePicture || User}
              alt="Profile"
              className="object-cover"
            />
          </div>
          <div>
            <div
              onClick={() => navigate(`/profile/${user._id}`)}
              className="flex gap-2 items-center"
            >
              <h4 className="font-semibold cursor-pointer hover:underline dark:text-[#E2E5E9] text-[12px] sm:text-[15px]">
                {posts?.user?.firstName} {posts?.user?.lastName}
              </h4>
            </div>
            <div className="flex justify-start items-center text-gray-500">
              <p className="text-xs dark:text-gray-400">{postDate}</p>
              <BsDot />
              <HiGlobeAsiaAustralia />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-max h-max p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3B3D3E] text-gray-600 text-[1rem] sm:text-[1.3rem] dark:text-[#E2E5E9] cursor-pointer">
            <BsThreeDots />
          </div>
          <div
            onClick={handleDeletePost}
            className="w-max h-max p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3B3D3E] text-gray-600 text-[1rem] sm:text-[1.3rem] dark:text-[#E2E5E9] cursor-pointer"
          >
            <RxCross1 />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <p className="text-sm leading-relaxed dark:text-[#E2E5E9]">
          {posts.content}
        </p>
      </div>

      {posts?.image && (
        <div className="post-media w-full h-full border-t border-t-gray-200">
          <img
            src={posts?.image}
            alt="post"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      <div className="w-full h-max p-2 flex justify-between items-center">
        <Reaction posts={posts} />
      </div>
    </div>
  );
};

export default PostCard;
