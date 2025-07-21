import React from 'react'

const LeftItem = ({icon, label}) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded dark:hover:bg-[#3B3D3E]">
      <div className="w-8 flex justify-center items-center">{icon}</div>
      <span className="font-semibold text-[14px] p-0 m-0 self-center dark:text-[#E4E6EA]">
        {label}
      </span>
    </div>
  );
}

export default LeftItem
