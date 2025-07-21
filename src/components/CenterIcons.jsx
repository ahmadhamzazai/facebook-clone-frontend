import React from "react";
import { NavLink } from "react-router-dom";
import { IoGameControllerOutline } from "react-icons/io5";
import { GoVideo } from "react-icons/go";
import { LuStore } from "react-icons/lu";
import { RiHome5Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const CenterIcons = () => {
  return (
    <div className="icons hidden xl:flex items-center gap-1 justify-between w-[500px] xl:w-[600px]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `py-2 w-1/5 cursor-pointer flex justify-center items-center 
          ${
            isActive
              ? "border-b-[3px] border-blue-500"
              : "rounded-[5px] hover:bg-gray-100 dark:hover:bg-[#4F5152] transition-colors duration-200"
          }`
        }
      >
        {({ isActive }) => (
          <div
            className={`
              p-2
              ${
                isActive ? "text-blue-500" : "text-gray-600 dark:text-[#B0B3B8]"
              }
            `}
          >
            <RiHome5Fill className="text-[1.5rem] xl:text-[1.8rem]" />
          </div>
        )}
      </NavLink>

      <NavLink
        to="/videos"
        className={({ isActive }) =>
          `py-2 w-1/5 cursor-pointer flex justify-center items-center 
          ${
            isActive
              ? "border-b-[3px] border-blue-500"
              : "rounded-[5px] hover:bg-gray-100 dark:hover:bg-[#4F5152] transition-colors duration-200"
          }`
        }
      >
        {({ isActive }) => (
          <div
            className={`
              p-2
              ${
                isActive ? "text-blue-500" : "text-gray-600 dark:text-[#B0B3B8]"
              }
            `}
          >
            <GoVideo className="text-[1.5rem] xl:text-[1.8rem]" />
          </div>
        )}
      </NavLink>

      <NavLink
        to="/store"
        className={({ isActive }) =>
          `py-2 w-1/5 cursor-pointer flex justify-center items-center 
          ${
            isActive
              ? "border-b-[3px] border-blue-500"
              : "rounded-[5px] hover:bg-gray-100 dark:hover:bg-[#4F5152] transition-colors duration-200"
          }`
        }
      >
        {({ isActive }) => (
          <div
            className={`
              p-2
              ${
                isActive ? "text-blue-500" : "text-gray-600 dark:text-[#B0B3B8]"
              }
            `}
          >
            <LuStore className="text-[1.5rem] xl:text-[1.8rem]" />
          </div>
        )}
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          `py-2 w-1/5 cursor-pointer flex justify-center items-center 
          ${
            isActive
              ? "border-b-[3px] border-blue-500"
              : "rounded-[5px] hover:bg-gray-100 dark:hover:bg-[#4F5152] transition-colors duration-200"
          }`
        }
      >
        {({ isActive }) => (
          <div
            className={`
              p-2
              ${
                isActive ? "text-blue-500" : "text-gray-600 dark:text-[#B0B3B8]"
              }
            `}
          >
            <FaUsers className="text-[1.5rem] xl:text-[1.8rem]" />
          </div>
        )}
      </NavLink>

      <NavLink
        to="/games"
        className={({ isActive }) =>
          `py-2 w-1/5 cursor-pointer flex justify-center items-center 
          ${
            isActive
              ? "border-b-[3px] border-blue-500"
              : "rounded-[5px] hover:bg-gray-100 dark:hover:bg-[#4F5152] transition-colors duration-200"
          }`
        }
      >
        {({ isActive }) => (
          <div
            className={`
              p-2
              ${
                isActive ? "text-blue-500" : "text-gray-600 dark:text-[#B0B3B8]"
              }
            `}
          >
            <IoGameControllerOutline className="text-[1.5rem] xl:text-[1.8rem]" />
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default CenterIcons;
