import React from 'react'

const FriendPage = () => {
  return (
    <div className="w-full">
      <div className="max-w-[950px] bg-white dark:bg-[#252728] mx-auto  flex flex-col gap-4 p-5 rounded-lg shadow-lg">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-xl">Friends</div>
          <div className="text-blue-500">See all friends</div>
        </div>

        <p>0 friends</p>
      </div>
    </div>
  );
}

export default FriendPage
