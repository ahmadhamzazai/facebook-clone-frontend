import {
  FaUserCircle,
  FaUserFriends,
  FaBookmark,
  FaUsers
} from "react-icons/fa";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { BiCalendarStar } from "react-icons/bi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { PiMonitorPlayFill } from "react-icons/pi";
import { HiMiniBuildingStorefront } from "react-icons/hi2"
import { IoStatsChartSharp } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa6";
import { GoChevronUp } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
import LeftItem from "./LeftItem";
import { useState } from "react";
import userImage from "../assets/user.png"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Left = () => {

    const [showMore, setShowMore] = useState(false)
    const {user} = useSelector(state=> state.auth)
    
  return (
    <div className="relative min-w-[270px]  overflow-y-auto">
      <div className="min-w-[270px] h-[calc(100vh-60px)] space-y-[9px] div-scrollbar sticky top-[60px] py-4 pr-4 ps-3 text-gray-800 hidden md:block">
        {/* Profile */}
        <Link
          to={`/profile/${user._id}`}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded dark:hover:bg-[#3B3D3E]"
        >
          <div className="rounded-full w-[33px] overflow-hidden h-[33px]">

          <img
            src={user.profilePicture || userImage}
            className="object-cover"
            alt=""
            />
            </div>
          <span className="font-semibold text-[14px] dark:text-[#E4E6EA]">
            {`${user.firstName} ${user.lastName}`}
          </span>
        </Link>

        {/* Meta AI */}
        <Link
          to="https://www.meta.ai/"
          target="_blank"
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded dark:hover:bg-[#3B3D3E]"
        >
          <img
            src="https://simplifyai.in/wp-content/uploads/2024/07/Meta-ai-logo.png"
            alt=""
            className="w-8 h-8"
          />
          <span className="text-[14px] font-semibold dark:text-[#E4E6EA]">
            Meta AI
          </span>
        </Link>

        {/* Sidebar items */}
        <div className="space-y-[9px]">
          <LeftItem
            icon={<FaUserFriends className="w-7 h-7 text-[#55D5C5]" />}
            label="Friends"
          />
          <LeftItem
            icon={
              <PiClockCounterClockwiseBold className="w-7 h-7 text-[#1E89E7]" />
            }
            label="Memories"
          />
          <LeftItem
            icon={<FaBookmark className="w-7 h-7 text-[#AF4ED6]" />}
            label="Saved"
          />
          <LeftItem
            icon={
              <FaUsers className="w-7 h-7 text-white rounded-full p-1 bg-[#21A1FB]" />
            }
            label="Groups"
          />
          <LeftItem
            icon={<PiMonitorPlayFill className="w-7 h-7 text-[#2BA0DB]" />}
            label="Reels"
          />
          <LeftItem
            icon={
              <HiMiniBuildingStorefront className="w-7 h-7 text-[#30A9D5]" />
            }
            label="Marketplace"
          />
          <LeftItem
            icon={<RiCalendarScheduleFill className="w-7 h-7 text-[#20A1FA]" />}
            label="Feeds"
          />
          <LeftItem
            icon={<BiCalendarStar className="w-7 h-7 text-[#F65873]" />}
            label="Events"
          />
          <LeftItem
            icon={<IoStatsChartSharp className="w-7 h-7 text-[#209BF9]" />}
            label="Ads Manager"
          />
          {!showMore && (
            <div onClick={() => setShowMore(true)}>
              <LeftItem
                icon={
                  <GoChevronDown className="w-7 h-7 bg-gray-300 p-1 rounded-full" />
                }
                label="Show More"
              />
            </div>
          )}

          {showMore && (
            <>
              <LeftItem
                icon={<FaGamepad className="w-7 h-7 text-[#F65873]" />}
                label="Games"
              />
              <div onClick={() => setShowMore(false)}>
                <LeftItem
                  icon={
                    <GoChevronUp className="w-7 h-7 bg-gray-300 p-1 rounded-full" />
                  }
                  label="Show Less"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Left;
