import React, { useEffect, useRef, useState } from "react";
import { FaUsers, FaFacebookMessenger } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { HiMiniBell } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";
import profileImage from "../assets/user.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import ProfileMenu from "./ProfileMenu";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RiMenu3Fill } from "react-icons/ri";
import CenterIcons from "./CenterIcons";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const popupRef = useRef(null);
  const menuToggleRef = useRef(null);
  const profileToggleRef = useRef(null);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(event.target) &&
        profileToggleRef.current &&
        !profileToggleRef.current.contains(event.target)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[60px] z-50 flex items-center justify-between px-3 bg-white dark:bg-[#252728] text-black dark:text-gray-600 shadow-sm p-1">
      <div className="flex items-center gap-2">
        <div className="text-blue-600 border-0 outline-none cursor-pointer text-[2.5rem]">
          <Link to="/" className="border-0 outline-none bg-red">
            <div className="min-w-[40px] h-[40px] overflow-hidden rounded-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
          </Link>
        </div>
        <div className="bg-[#f1f2f5] dark:bg-[#333334] dark:text-[#B0B3B8] rounded-full p-2 min-w-[40px] min-h-[40px] flex items-center justify-center gap-1 px-3">
          <FiSearch className="text-gray-600 dark:text-[#B0B3B8] text-[16px]" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="text-md sm:block hidden outline-none bg-[#f1f2f5] dark:bg-[#333334] dark:text-[#B0B3B8]"
          />
        </div>
      </div>

      <CenterIcons />

      <div className="sm:hidden block">
        <button
          ref={menuToggleRef}
          onClick={toggleMenu}
          className="bg-gray-200 dark:bg-[#3B3D3E] dark:text-[#E2E5E9] hover:bg-gray-300 p-[10px] rounded-full dark:hover:bg-[#4F5152]"
        >
          <RiMenu3Fill className="text-xl text-black dark:text-white" />
        </button>
      </div>
      <div className="items-center hidden sm:flex justify-end gap-2 w-[280px]">
        <button className="bg-gray-200 dark:bg-[#3B3D3E] dark:text-[#E2E5E9] hover:bg-gray-300 p-[10px] rounded-full dark:hover:bg-[#4F5152]">
          <CgMenuGridO className="text-xl text-black dark:text-white" />
        </button>
        <button className="bg-[#E2E5E9] dark:bg-[#3B3D3E] dark:text-[#E2E5E9] cursor-pointer hover:bg-[#d2d4d8e7] p-[10px] rounded-full dark:hover:bg-[#4F5152]">
          <FaFacebookMessenger className="text-xl" />
        </button>
        <button className="relative bg-[#E2E5E9] dark:bg-[#3B3D3E] dark:text-[#E2E5E9] cursor-pointer hover:bg-[#d2d4d8e7] p-[10px] rounded-full dark:hover:bg-[#4F5152]">
          <HiMiniBell className="text-xl" />
          <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs px-1.5 rounded-full">
            20+
          </span>
        </button>
        <div
          ref={profileToggleRef}
          onClick={toggleMenu}
          className="relative profile-image"
        >
          <img
            src={user?.profilePicture || profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="absolute bottom-0 cursor-pointer -right-1 bg-gray-300 text-black text-xs border-2 border-gray-100 rounded-full">
            <FiChevronDown />
          </span>
        </div>
      </div>
      {openMenu && <ProfileMenu ref={popupRef} />}
    </div>
  );
};

export default Navbar;
