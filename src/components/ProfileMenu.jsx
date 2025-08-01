import React, { useState, forwardRef } from "react";
import { FaCog, FaQuestionCircle, FaMoon, FaSignOutAlt } from "react-icons/fa";
import profileImage from "../assets/user.png";
import { MdFeedback } from "react-icons/md";
import { BsChevronRight } from "react-icons/bs";
import InsideSettings from "./InsideSettings";
import InsideDisplay from "./InsideDisplay";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import { IoPeopleSharp } from "react-icons/io5";

const ProfileMenu = forwardRef((props, popupRef) => {

  const {user} = useSelector(state => state.auth)

  const [viewActive, setViewActice] = useState("main");
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "https://facebook-clone-backend-production-e1fc.up.railway.app/api/logout"
      );
      if (response.data.success) {
        dispatch(setUser(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {viewActive === "main" && (
        <div
          ref={popupRef}
          className="absolute top-16 right-4 w-[360px] bg-white dark:bg-[#242627] shadow-2xl rounded-xl p-4"
        >
          {/* Profiles Section */}
          <div className="p-2 shadow-2xl cursor-pointer dark:bg-[#252728] rounded-2xl">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-100  dark:hover:bg-[#3B3D3E] rounded-lg cursor-pointer">
              <img
                src={user?.profilePicture || profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold dark:text-[#D9DCE0]">
                {user?.firstName} {user?.lastName}
              </span>
            </div>

            <div className="h-[1px] w-full bg-gray-300 my-1 dark:bg-gray-600"></div>

            <div className="p-2">
              <button className="w-full bg-gray-200 cursor-pointer dark:bg-[#3B3D3E] dark:text-[#D9DCE0] text-center rounded-md flex items-center justify-center gap-2 p-2 font-medium text-md hover:bg-gray-300 dark:hover:bg-[#4F5051] transition">
                <IoPeopleSharp />
                <div>See all profiles</div>
              </button>
            </div>
          </div>

          {/* Menu Options */}
          <div className="pt-2 space-y-1">
            <div
              onClick={() => setViewActice("settings")}
              className="flex items-center justify-between hover:bg-gray-100  dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer"
            >
              <div className="flex justify-center items-center gap-2">
                <div className="bg-gray-300 text-[22px] text-black rounded-full dark:text-[#E4E6EA] dark:bg-[#4F5051] p-2">
                  <FaCog />
                </div>
                <div className="flex items-center text-[14px] font-semibold dark:text-[#E4E6EA]">
                  Settings & Privacy
                </div>
              </div>
              <BsChevronRight className="font-[600] text-xl dark:text-[#E4E6EA] " />
            </div>

            <div className="flex items-center justify-between hover:bg-gray-100  dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer">
              <div className="flex justify-center items-center gap-2">
                <div className="bg-gray-300 text-[22px] text-black rounded-full dark:text-[#E4E6EA] dark:bg-[#4F5051] p-2 ">
                  <FaQuestionCircle />
                </div>
                <div className="flex items-center  dark:text-[#E4E6EA] text-[14px] font-semibold">
                  Help & support
                </div>
              </div>
              <BsChevronRight className="font-[600] text-xl dark:text-[#E4E6EA] " />
            </div>

            <InsideDisplay />

            <div className="flex items-center justify-between hover:bg-gray-100  dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer">
              <div className="flex justify-center items-center gap-2">
                <div className="bg-gray-300 text-[22px] text-black rounded-full dark:text-[#E4E6EA] dark:bg-[#4F5051] p-2">
                  <MdFeedback />
                </div>
                <div className="flex items-center text-[14px] font-semibold dark:text-[#E4E6EA]">
                  Give feedback
                </div>
              </div>
            </div>

            <div
              onClick={logoutHandler}
              className="flex items-center justify-between hover:bg-gray-100  dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer"
            >
              <div className="flex justify-center items-center gap-2">
                <div className="bg-gray-300 text-[22px] text-black rounded-full dark:text-[#E4E6EA] dark:bg-[#4F5051] p-2">
                  <FaSignOutAlt />
                </div>
                <div className="flex items-center text-[14px] font-semibold dark:text-[#E4E6EA]">
                  Log out
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-[10px] text-gray-500 text-center pt-3 px-2 dark:text-[#E4E6EA]">
            Privacy · Terms · Advertising · Ad choices · Cookies · More · Meta ©
            2025
          </div>
        </div>
      )}

      {viewActive === "settings" && (
        <InsideSettings setViewActice={setViewActice} />
      )}

      {viewActive === "display" && (
        <InsideDisplay setViewActice={setViewActice} />
      )}
    </>
  
);
});

export default ProfileMenu;
