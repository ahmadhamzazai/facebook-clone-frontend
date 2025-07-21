import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import StoryUpload from "./StoryUpload";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import User from "../assets/user.png"; 

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);
  const scrollRef = useRef(null);

  const fetchStories = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/story`, {
        withCredentials: true,
      });
      setStories(res.data);
    } catch (err) {
      console.error("Failed to load stories:", err);
      setStories([]);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    const checkChevronVisibility = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        setShowLeftChevron(scrollLeft > 0);
        setShowRightChevron(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };

    checkChevronVisibility();

    const currentScrollRef = scrollRef.current;
    currentScrollRef?.addEventListener("scroll", checkChevronVisibility);
    window.addEventListener("resize", checkChevronVisibility);

    const mediaLoadTimeout = setTimeout(checkChevronVisibility, 500);

    return () => {
      currentScrollRef?.removeEventListener("scroll", checkChevronVisibility);
      window.removeEventListener("resize", checkChevronVisibility);
      clearTimeout(mediaLoadTimeout);
    };
  }, [stories]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleStoryUploaded = (newStory) => {

    setStories((prevStories) => [newStory, ...prevStories]);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        setShowLeftChevron(scrollLeft > 0);
        setShowRightChevron(scrollLeft + clientWidth < scrollWidth - 1);
      }
    }, 100);
  };

  const handleVideoMouseEnter = (e) => {
    if (e.currentTarget.tagName === "VIDEO") {
      e.currentTarget.play().catch((error) => {
        console.warn("Video autoplay prevented:", error);
      });
    }
  };

  const handleVideoMouseLeave = (e) => {
    if (e.currentTarget.tagName === "VIDEO") {
      e.currentTarget.pause();
      e.currentTarget.currentTime = 0;
    }
  };

  return (
    <div className="relative">
      {showLeftChevron && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white dark:bg-[#3A3B3C] shadow-md rounded-full p-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-opacity duration-300 opacity-100"
        >
          <FaChevronLeft size={18} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto whitespace-nowrap pr-2 scroll-smooth scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="inline-block w-[115px] h-[210px] shadow-[0_2px_5px_-lightgray] border-[1px] border-gray-200 rounded-xl dark:border-0 bg-white relative overflow-hidden shrink-0">
          <StoryUpload onStoryUploaded={handleStoryUploaded} />
        </div>

        {stories.length === 0 ? (
          <div className="flex items-center justify-center h-[210px] w-full text-gray-500">
            No stories to display.
          </div>
        ) : (
          stories.map((story) => (
            <div
              key={story._id}
              className="inline-block w-[115px] h-[210px] shadow-[0_2px_5px_-lightgray] border-[1px] border-gray-200 rounded-xl dark:border-0 bg-white relative overflow-hidden shrink-0 cursor-pointer"
            >
              <img
                src={story.user?.profilePicture || User}
                className="w-[40px] h-[40px] rounded-full absolute border-4 border-blue-600 top-3 left-3 object-cover z-10"
                alt={`${story.user?.firstName}'s profile`}
              />

              {typeof story.mediaUrl === "string" &&
              story.mediaUrl.endsWith(".mp4") ? (
                <video
                  src={story.mediaUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  onMouseEnter={handleVideoMouseEnter}
                  onMouseLeave={handleVideoMouseLeave}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/115x210?text=Video+Error";
                  }}
                />
              ) : (
                <img
                  src={story.mediaUrl || User}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/115x210?text=Image+Error";
                  }}
                />
              )}

              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white text-start text-[9px] sm:text-[10px] whitespace-pre-wrap pt-4 pb-2 font-semibold px-2 dark:text-[#E4E6EA]">
                {story.user?.firstName} {story.user?.lastName}
              </div>
            </div>
          ))
        )}
      </div>

      {showRightChevron && (
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white dark:bg-[#3A3B3C] shadow-md rounded-full p-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-opacity duration-300 opacity-100"
        >
          <FaChevronRight size={18} />
        </button>
      )}
    </div>
  );
};

export default StoryList;
