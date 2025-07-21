import React from "react";
import { PiVideoCameraFill } from "react-icons/pi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { MdPhotoLibrary } from "react-icons/md";
import PostPopup from "./PostPopup";
import profileImage from "../assets/user.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostCreate = ({
  setShowPopup,
  handlePostCreated,
  showPopup,
  postRef,
}) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="bg-white py-3 px-4 dark:bg-[#252728] rounded-xl shadow">
      <div className="flex items-center gap-2">
        <div
          onClick={() => navigate(`/profile/:${user._id}`)}
          className="rounded-full cursor-pointer h-[35px] sm:h-[40px] overflow-hidden w-[35px] sm:w-[40px]"
        >
          <img
            src={user?.profilePicture || profileImage}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>
        <input
          type="text"
          placeholder={`What's on your mind, ${user.firstName} ${user.lastName}?`}
          className="flex-1 h-[35px] sm:h-[40px] placeholder:text-[13px] sm:placeholder:text-[14px] px-4 py-2 bg-gray-100 dark:bg-[#333334] dark:placeholder:text-[#B8BBBF] dark:hover:bg-[#484849] text-gray-600 placeholder:text-gray-500 rounded-full outline-none"
          onClick={() => setShowPopup(true)}
        />
      </div>

      <div className="h-[1px] w-full dark:bg-gray-500 mt-1 sm:mt-3"></div>

      <div className="flex justify-between mt-4 px-6">
        <button className="flex items-center text-xl sm:text-2xl gap-2 text-red-500">
          <PiVideoCameraFill />
          <span className="text-gray-500 dark:text-[#ABADB1] text-[12px] sm:text-[14px] font-medium">
            Live Video
          </span>
        </button>
        <button
          onClick={() => setShowPopup(true)}
          className="flex items-center text-xl sm:text-2xl gap-2 text-green-600"
        >
          <MdPhotoLibrary />
          <span className="text-gray-500 dark:text-[#ABADB1] text-[12px] sm:text-[14px] font-medium">
            Photo/video
          </span>
        </button>
        <button className="hidden sm:flex items-center text-2xl gap-2 text-yellow-500">
          <MdOutlineEmojiEmotions />
          <span className="text-gray-500 dark:text-[#ABADB1] text-[14px] font-medium">
            Feeling/activity
          </span>
        </button>
      </div>

      {showPopup && (
        <PostPopup
          ref={postRef}
          setShowPopup={setShowPopup}
          handlePostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

export default PostCreate;
