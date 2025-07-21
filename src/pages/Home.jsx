import React from "react";
import Navbar from "../components/Navbar";
import MainPage from "../components/MainPage";
import Right from "../components/Right";

function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-[#1C1C1D]">
      <div className="m-auto max-w-[1900px]">
        <MainPage />
      </div>
    </div>
  );
}

export default Home;
