import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/Center.css";
import PostCreate from "./PostCreate";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import PostCard from "./PostCard";
import StoryList from "./StoryList";

const Center = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [refresh, setRefresh] = useState(false);

  const handleStoryUploaded = () => {
    setRefresh(!refresh);
  };

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
      const response = await axios.get(
        "https://facebook-clone-backend-production-e1fc.up.railway.app/api/my-posts",
        {
          withCredentials: true,
        }
      );

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
    <div className="flex flex-col gap-4 mt-3 xl:mx-auto max-w-[500px] lg:mx-10 mx-auto px-2 sm:p-0">
      <PostCreate
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        postRef={postRef}
        handlePostCreated={handlePostCreated}
      />

      <div>
        <StoryList key={refresh} />
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't created any posts yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              posts={post}
              onPostDelete={(id) => {
                setPosts((prevPosts) => prevPosts.filter((p) => p._id !== id));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Center;
