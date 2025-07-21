import React from 'react'

const Reels = () => {
  return (
    <div className="w-full p-5">
      <div className="max-w-[950px] bg-white dark:bg-[#1C1C1D] mx-auto  flex flex-col gap-4 p-5 rounded-lg shadow-lg">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-xl">Reels</div>
          <div className="text-blue-500 hover:text-blue-600 cursor-pointer">
            See all reels
          </div>
        </div>

        <p>No reels</p>
      </div>
    </div>
  );
}

export default Reels
