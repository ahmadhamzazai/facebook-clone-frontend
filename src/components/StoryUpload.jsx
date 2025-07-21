import React, { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import profileImage from "../assets/white-bg.jpg";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const StoryUpload = ({ onStoryUploaded }) => {
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!media) {
      toast.error("Please select an image or video to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("media", media);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/story",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      const storyForImmediateDisplay = {
        ...res.data,
        mediaUrl: preview,
        user: {
          _id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          profilePicture: user?.profilePicture,
        },
      };

      onStoryUploaded(storyForImmediateDisplay);

      toast.success(res.data.message || "Story uploaded successfully!");
      setCaption("");
      setMedia(null);
      setPreview(null);
    } catch (err) {
      console.error("Story upload failed", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to upload story. Please try again."
      );
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setMedia(null);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="inline-block w-[115px] h-[210px] shadow-[0_2px_5px_-lightgray] dark:bg-[#252728] border-b-2 border-lightgray dark:border-0 rounded-xl bg-white relative overflow-hidden shrink-0 cursor-pointer">
        <label className="absolute inset-0 cursor-pointer">
          {preview ? (
            media && media.type.startsWith("video/") ? (
              <video
                src={preview}
                className="w-full h-[80%] object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={preview}
                alt="Image Preview"
                className="w-full h-[80%] object-cover"
              />
            )
          ) : (
            <img
              src={user?.profilePicture || profileImage}
              alt="Default Profile"
              className="w-full h-[80%] object-cover"
            />
          )}

          <div className="w-full h-[80%] absolute top-0 left-0 bg-gradient-to-t from-black/35 to-black/17"></div>

          <div className="absolute bottom-0 w-full bg-white text-black dark:bg-[#252728] dark:text-[#E4E6EA] text-center text-[12px] pt-4 font-semibold pb-2">
            Create story
          </div>

          <div className="absolute w-full bg-transparent text-center text-[2.5rem] flex justify-center items-center bottom-7">
            <BsFillPlusCircleFill className="text-[#0866FF] hover:text-[#0867ffe8] bg-white border-white dark:border-[#252728] border-[4px] rounded-full" />
          </div>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {preview && (
          <button
            type="submit"
            className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded z-20"
          >
            Post
          </button>
        )}
      </div>
    </form>
  );
};

export default StoryUpload;
