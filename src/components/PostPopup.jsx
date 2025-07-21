import React, { forwardRef, useRef, useState } from "react";
import { FaUserFriends, FaPhotoVideo, FaMapMarkerAlt } from "react-icons/fa";
import { FaRegFaceGrin } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { FaUserTag } from "react-icons/fa6";
import { HiMiniGif } from "react-icons/hi2";
import { useSelector } from "react-redux";
import userImage from "../assets/user.png";
import { FaCaretDown } from "react-icons/fa";
import Aa from "../assets/Aa.png";
import { BsEmojiSmile } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";

const PostPopup = forwardRef(({ setShowPopup, handlePostCreated }, postRef) => {
  const { user } = useSelector((state) => state.auth);

  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitPost = async () => {
    if (!content.trim() && !selectedImage) {
      toast.error("Please enter something or select an image to post.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("content", content);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setContent("");
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        handlePostCreated();
        setShowPopup(false);
      } else {
        toast.error(response.data.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the post.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isPostButtonDisabled = loading || (!content.trim() && !selectedImage);

  return (
    <div className="fixed inset-0 bg-[#F6F6F6]/75 dark:bg-[#0F0F0F]/85 backdrop-blur-xs flex justify-center items-center z-50">
      <div
        ref={postRef}
        className="bg-white w-[500px] dark:bg-[#252728] dark:border border-[#303233] rounded-xl shadow-2xl mr-[12px]"
      >
        <div className="relative text-center border-b dark:border-[#303233] dark:text-[#E2E5E9] p-4 font-bold text-xl text-black">
          Create post
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-3 right-4 p-2 rounded-full hover:bg-[#D6D9DD] hover:text-[#5B626A] bg-gray-200 dark:bg-[#3B3D3E] dark:text-[#A8ABAF] dark:hover:bg-[#4F5051] "
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <div className="py-3 px-4">
          <div className="flex items-center">
            <img
              src={user?.profilePicture || userImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="font-medium text-black dark:text-[#E2E5E9] text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <button className="text-xs text-black bg-[#E2E5E9] dark:bg-[#3B3D3E] dark:text-[#E2E5E9] rounded px-2 py-1 mt-1 flex items-center space-x-1">
                <FaUserFriends />
                <span>Friends</span>
                <FaCaretDown />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <textarea
              rows="3"
              placeholder={`What's on your mind, ${user?.firstName} ${user?.lastName}?`}
              className="w-full text-black placeholder-[#707377] text-2xl resize-none focus:outline-none bg-transparent dark:text-[#E2E5E9]"
              value={content}
              onChange={handleContentChange}
            />
          </div>

          {imagePreview && (
            <div className="relative mt-4 border border-gray-300 dark:border-[#4F5051] rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Selected Preview"
                className="w-full object-contain max-h-60"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition-colors"
              >
                <MdClose className="text-lg" />
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 mt-2">
            <div>
              <img src={Aa} alt="" width={40} />
            </div>
            <div className="text-[26px] text-gray-500 dark:text-[#84868a]">
              <BsEmojiSmile />
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center bg-white border border-gray-300 dark:border-[#65686C] dark:bg-[#252728] rounded-lg px-3 py-2">
              <span className="text-[14px] font-medium text-black dark:text-[#E2E5E9] cursor-pointer">
                Add to your post
              </span>
              <div className="flex items-center text-2xl">
                <div
                  className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#4F5051] rounded-full"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaPhotoVideo className="text-green-500 cursor-pointer" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#4F5051] rounded-full">
                  <FaUserTag className="text-blue-500 cursor-pointer" />
                </div>
                <div className="p-2 cursor-pointer hidden sm:block hover:bg-gray-200 dark:hover:bg-[#4F5051] rounded-full">
                  <FaRegFaceGrin className="text-yellow-500 cursor-pointer" />
                </div>
                <div className="p-2 cursor-pointer hidden sm:block hover:bg-gray-200 dark:hover:bg-[#4F5051] rounded-full">
                  <FaMapMarkerAlt className="text-red-500 cursor-pointer" />
                </div>
                <div className="p-2 cursor-pointer hidden sm:block hover:bg-gray-200 dark:hover:bg-[#4F5051] rounded-full">
                  <HiMiniGif className="text-cyan-500 cursor-pointer" />
                </div>
                <div className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#4F5051] rounded-full">
                  <BsThreeDots className="text-gray-500 dark:text-[#A8ABAF]" />
                </div>
              </div>
            </div>
          </div>

          <div className="py-4">
            <button
              onClick={handleSubmitPost}
              className={`w-full font-semibold py-1 rounded-lg ${
                isPostButtonDisabled
                  ? "bg-[#E2E5E9] dark:bg-[#3B3D3E] dark:text-[#717273] text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              }`}
              disabled={isPostButtonDisabled}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostPopup;
