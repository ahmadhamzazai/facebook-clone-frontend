import React from "react";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUniversity,
  FaPhoneAlt,
  FaHeart,
  FaQuoteLeft,
} from "react-icons/fa";

const About = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const bio = userProfile?.bio;

  if (!bio) {
    return (
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-2">About</h2>
        <p className="text-gray-500 italic">No bio data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-[950px] bg-white mx-auto dark:bg-[#1C1C1D] flex flex-col p-5 gap-4  rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center">About</h2>

        <div className="flex flex-col gap-2">
          {bio.bioText && (
            <div className="flex items-center dark:text-[#E4E6EA] text-gray-800">
              <FaQuoteLeft className="mr-2 dark:text-[#E4E6EA] text-blue-500" />
              <div className=" text-[11px] sm:text-[14px]">
                <span className="font-bold mr-3">Intro</span>
                {bio.bioText}
              </div>
            </div>
          )}

          {bio.liveIn && (
            <div className="flex items-center dark:text-[#E4E6EA] text-gray-800">
              <FaHome className="mr-2 dark:text-[#E4E6EA] text-green-600" />
              <div className=" text-[11px] sm:text-[14px]">
                <span className="font-bold mr-3">Lives </span>in {bio.liveIn}
              </div>
            </div>
          )}

          {bio.hometown && (
            <div className="flex items-center dark:text-[#E4E6EA] text-gray-800">
              <FaMapMarkerAlt className="mr-2 dark:text-[#E4E6EA] text-red-500" />
              <div className=" text-[11px] sm:text-[14px]">
                <span className="font-bold mr-3">From</span> {bio.hometown}
              </div>
            </div>
          )}

          {bio.workplace && (
            <div className="flex items-center dark:text-[#E4E6EA] text-gray-800">
              <FaBriefcase className="mr-2 dark:text-[#E4E6EA] text-yellow-600" />
              <div className=" text-[11px] sm:text-[14px]">
                <span className="font-bold mr-3">Works </span>at {bio.workplace}
              </div>
            </div>
          )}

          {bio.education && (
            <div className="flex items-center dark:text-[#E4E6EA] text-gray-800">
              <FaUniversity className="mr-2 dark:text-[#E4E6EA] text-purple-600" />
              <div className=" text-[11px] sm:text-[14px]">
                <span className="font-bold mr-3">Studied at</span>{" "}
                {bio.education}
              </div>
            </div>
          )}

          {bio.phone && (
            <div className="flex items-center dark:text-[#E4E6EA] text-gray-800">
              <FaPhoneAlt className="mr-2 dark:text-[#E4E6EA] text-pink-600" />
              <div className=" text-[11px] sm:text-[14px]">
                <span className="font-bold mr-3">Phone:</span> {bio.phone}
              </div>
            </div>
          )}

          {bio.relationship && (
            <div className="flex items-center dark:text-[#E4E6EA] text-gray-800">
              <FaHeart className="mr-2 dark:text-[#E4E6EA] text-red-600" />
              <div className=" text-[11px] sm:text-[14px]">
                <span className="font-bold mr-3">Relationship:</span>
                {bio.relationship}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
