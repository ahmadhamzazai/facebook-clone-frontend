import React, { useEffect, useRef, useState } from "react";
import Intro from "./Intro";
import Photos from "../components/Photos.jsx";
import PostCreate from "../components/PostCreate.jsx";
import { IoFilter } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import "../styles/Center.css";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import axios from "axios";
import PostCard from "./PostCard.jsx";
import FriendPage from "./FriendPage.jsx";

const Post = () => {
  const [showPopup, setShowPopup] = useState(false);
  const postRef = useRef(null);

  useEffect(() => {
    const hidePopup = (event) => {
      if (postRef.current && !postRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", hidePopup);

    return () => {
      document.removeEventListener("mousedown", hidePopup);
    };
  }, []);

  const { user } = useSelector((state) => state.auth);
  const [refresh, setRefresh] = useState(false);

  const handleStoryUploaded = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const hidePopup = (event) => {
      if (postRef.current && !postRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", hidePopup);
    return () => {
      document.removeEventListener("mousedown", hidePopup);
    };
  }, []);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyPosts = useCallback(async () => {
    if (!user?._id) {
      setLoading(false);
      setError("Please log in to view your posts.");
      setPosts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3000/api/my-posts", {
        withCredentials: true,
      });

      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        setError(response.data.message || "Failed to fetch posts.");
        toast.error(response.data.message || "No posts available.");
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Network error or server unavailable.";
      setError(errorMessage);
      toast.error(errorMessage);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const handlePostCreated = useCallback(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[950px] mx-auto flex justify-start flex-col lg:flex-row lg:justify-center gap-3 lg:gap-4 p-0 lg:p-5">
      <div className="left-post w-[95%] lg:w-[40%] flex mx-auto lg:m-0 flex-col gap-3">
        <div className="w-full rounded-lg p-3  bg-white dark:bg-[#252728] flex flex-col gap-2">
          <h1 className="font-bold text-xl">Intro</h1>
          <Intro />
        </div>
        <div>
          <FriendPage />
        </div>
      </div>

      <div className="w-[95%] lg:w-[60%]  mx-auto lg:m-0 flex gap-3 flex-col h-full">
        <PostCreate
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          postRef={postRef}
        />

        <div className="shadow-md bg-white dark:bg-[#252728] rounded-lg p-3 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div>Posts</div>
            <div className="flex justify-center items-center gap-2">
              <div className="flex items-center gap-1 bg-[#E2E5E9] dark:bg-[#333334] text-black dark:text-gray-400 cursor-pointer rounded-lg p-2">
                <IoFilter />
                <div>Filters</div>
              </div>
              <div className="flex items-center gap-1 bg-[#E2E5E9] dark:bg-[#333334] text-black dark:text-gray-400 cursor-pointer rounded-lg p-2">
                <IoIosSettings />
                <div>Manage Settings</div>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gray-600 my-3"></div>

          {posts.length === 0 ? (
            <p className="text-center dark:text-white text-gray-600">
              You haven't created any posts yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  posts={post}
                  onPostDelete={(id) => {
                    setPosts((prevPosts) =>
                      prevPosts.filter((p) => p._id !== id)
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
