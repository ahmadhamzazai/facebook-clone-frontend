import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { PiGlobeBold } from "react-icons/pi";
import { HiMiniLockClosed } from "react-icons/hi2";
import { FaHouseLock } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

const InsideSettings = ({ setViewActice }) => {
  const goBack = () => {
    setViewActice("main");
  };

  return (
    <div className="absolute top-16 right-4 w-[360px] bg-white dark:bg-[#242627] shadow-2xl rounded-xl p-4">
      <div className="space-y-1">
        <div
          className="flex items-center gap-4 p-2 rounded-lg cursor-pointer"
          onClick={goBack}
        >
          <div className="p-2 hover:bg-gray-100 dark:text-[#E4E6EA] dark:hover:bg-[#3B3D3E] rounded-full text-[20px]">
            <HiOutlineArrowLeft />
          </div>
          <span className="font-medium text-2xl dark:text-[#E4E6EA]">
            Settings & Privacy
          </span>
        </div>

        <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gray-300 text-black dark:text-[#E4E6EA] dark:bg-[#4F5051] rounded-full p-2">
              <FaCog />
            </div>
            <div className="flex items-center text-[14px] font-medium dark:text-[#E4E6EA]">
              Settings
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gray-300 text-[22px] text-black dark:text-[#E4E6EA] dark:bg-[#4F5051] rounded-full p-2 ">
              <PiGlobeBold />
            </div>
            <div className="flex items-center text-[14px] font-medium dark:text-[#E4E6EA]">
              Language
            </div>
          </div>
          <BsChevronRight className="font-[600] text-xl dark:text-[#E4E6EA]" />
        </div>

        <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gray-300 text-[22px] text-black dark:text-[#E4E6EA] dark:bg-[#4F5051] rounded-full p-2 ">
              <HiMiniLockClosed />
            </div>
            <div className="flex items-center text-[14px] font-medium dark:text-[#E4E6EA]">
              Privacy Checkup
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gray-300 text-[22px] text-black dark:text-[#E4E6EA] dark:bg-[#4F5051] rounded-full p-2 ">
              <FaHouseLock />
            </div>
            <div className="flex items-center text-[14px] font-medium dark:text-[#E4E6EA]">
              Privacy Center
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gray-300 text-[22px] text-black dark:text-[#E4E6EA] dark:bg-[#4F5051] rounded-full p-2 ">
              <TfiMenuAlt />
            </div>
            <div className="flex items-center text-[14px] font-medium dark:text-[#E4E6EA]">
              Activity Log
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gray-300 text-[22px] text-black dark:text-[#E4E6EA] dark:bg-[#4F5051] rounded-full p-2 ">
              <HiAdjustmentsHorizontal />
            </div>
            <div className="flex items-center text-[14px] font-medium dark:text-[#E4E6EA]">
              Content Preferences
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsideSettings;
