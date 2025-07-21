import React from "react";
import Left from "./Left";
import Center from "./Center";
import Right from "./Right";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="mt-[60px] h-[calc(100vh-60px)] bg-gray-100 dark:bg-[#1C1C1D] overflow-hidden flex relative">
      <div className="w-[270px] absolute left-0 top-0 h-full overflow-y-auto scrollbar-thin shrink-0 hidden xl:block">
        <Left />
      </div>

      <div className="w-full flex-1 h-[calc(100vh-60px)] overflow-y-auto">
        {/* <Center /> */}
        <Outlet/>
      </div>

      <div className="w-[270px] h-full absolute right-7 top-0 hidden lg:block">
        <Right />
      </div>
    </div>
  );
};

export default MainPage;
