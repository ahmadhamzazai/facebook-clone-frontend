import React, { forwardRef, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { GiWoodFrame } from "react-icons/gi";
import { MdEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setUserProfile } from "../redux/authSlice";
import { useEffect } from "react";
import { useState } from "react";

const ProfilePicturePopup = forwardRef(({setShowUpload}, ref) => {
    const profileRef = useRef();
    const dispatch = useDispatch();
    const { user, userProfile } = useSelector((state) => state.auth);
  const placeholderPhotos = Array(6).fill(0);

   const handleProfilePicChange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        dispatch(setLoading(true));
        const res = await axios.put(
          "http://localhost:3000/api/update/profile-picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          const profilePicture = res.data.profilePicture;

          dispatch(setUser({ ...user, profilePicture }));
          dispatch(setUserProfile({ ...userProfile, profilePicture }));
        }
      } catch (error) {
        console.error("Error uploading profile picture", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

      const [images, setImages] = useState([]);
    
      useEffect(() => {
        const fetchRecentImages = async () => {
          try {
            const res = await axios.get(
              "https://facebook-clone-backend-production-e1fc.up.railway.app/api/recent-uploads",
              {
                withCredentials: true,
              }
            );
            setImages(res.data.images);
          } catch (error) {
            console.error("Error fetching images:", error);
          }
        };
    
        fetchRecentImages();
      }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={ref}
        className="relative max-w-2xl mx-3 bg-white rounded-lg w-full  p-4  shadow-lg"
      >
        <div>
          {/* Header */}
          <div className="flex justify-between w-full items-center border-b pb-3">
            <h2 className="text-lg font-bold text-center">
              Choose profile picture
            </h2>
          </div>
          <button
            onClick={() => setShowUpload(false)}
            className="absolute top-3 right-3 text-gray-600 bg-gray-300 rounded-full p-2 text-xl hover:text-gray-800"
          >
            <RxCross1 />
          </button>

          {/* Upload and Frame Buttons */}
          <div className="flex flex-col justify-between items-stretch gap-2 mt-4">
            <div
              onClick={() => profileRef?.current.click()}
              className="w-full flex justify-center items-center gap-1 rounded-lg cursor-pointer hover:bg-[#cfdce9] bg-[#DFE9F2] text-[#0064D1] text-[14px] font-semibold p-2 h-full"
            >
              <FiPlus />
              <div>Upload Photo</div>

              <input
                type="file"
                ref={profileRef}
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </div>
            <div className="w-full flex justify-center items-center gap-1 cursor-pointer text-[14px] font-semibold hover:bg-[#D6D9DD] rounded-lg bg-gray-300 p-2 h-full">
              <GiWoodFrame />
              <div>Add Frame</div>
            </div>
            <div className="p-2 bg-gray-300 cursor-pointer rounded-lg hover:bg-[#D6D9DD] text-[19px] flex justify-center items-center">
              <MdEdit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfilePicturePopup;
