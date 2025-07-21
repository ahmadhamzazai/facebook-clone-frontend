import React from 'react'

const Videos = () => {
  return (
    <div className="w-full">
      <div className="max-w-[950px] bg-white dark:bg-[#1C1C1D] mx-auto  flex flex-col gap-4 p-5 rounded-lg shadow-lg">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-xl">Videos</div>
          <div className="text-blue-500 hover:text-blue-600 cursor-pointer">
            See all videos
          </div>
        </div>

        <p>No videos</p>
      </div>
    </div>
  );
}

export default Videos
