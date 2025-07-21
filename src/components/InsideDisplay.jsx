import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";
import { TiAdjustBrightness } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { useEffect } from "react";

const InsideDisplay = ({ setViewActice }) => {

  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleMode = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    console.log("Theme changed to:", theme);
  }, [theme]);


  return (
    <div
      onClick={handleMode}
      className="flex items-center justify-between hover:bg-gray-100  dark:hover:bg-[#3B3D3E] p-2 rounded-md cursor-pointer"
    >
      <div className="flex justify-center items-center gap-2">
        {theme == "light" && (
          <div className="flex items-center gap-2">
            <div className="bg-gray-300 text-[22px] text-black rounded-full dark:text-[#E4E6EA] dark:bg-[#4F5051] p-2">
              <FaMoon />
            </div>
            <div className="flex items-center text-[14px] font-semibold">
              Dark Mode
            </div>
          </div>
        )}

        {theme == "dark" && (
          <div className="flex items-center gap-2">
            <div className="bg-gray-300 text-[22px] text-black rounded-full dark:text-[#E4E6EA] dark:bg-[#4F5051] p-2">
              <TiAdjustBrightness />
            </div>
            <div className="flex items-center text-[14px] font-semibold dark:text-[#E4E6EA]">
              Light Mode
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsideDisplay;
