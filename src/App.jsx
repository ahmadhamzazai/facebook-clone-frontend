import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; // Import Outlet
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Layout from "./components/Layout";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Photos from "./components/Photos";
import About from "./components/About";
import FriendPage from "./components/FriendPage";
import Videos from "./components/Videos";
import Reels from "./components/Reels";
import AllPhotos from "./components/AllPhotos";
import MainPage from "./components/MainPage";
import Center from "./components/Center";
import Store from "./components/Store"
import HomeVideos from "./components/HomeVideos";
import Users from "./components/Users";
import Games from "./components/Games";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        {/* Layout already handles its own internal scrolling correctly */}
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
              {
                path: "/",
                element: <Center/>
              },
              {
                path: "videos",
                element: <HomeVideos/>
              },
              {
                path: "store",
                element: <Store/>
              },
              {
                path: "users",
                element: <Users/>
              },
              {
                path: "games",
                element: <Games/>
              }
        ]
      },
      {
        path: "/friends",
        element: <Friends />,
      },
      // Other top-level routes that use the Layout
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute>
        {/* Navbar is outside the scrollable container, fixed at the top */}
        <Navbar />
        {/* This div will now manage the scrolling for the Profile page content */}
        <div
          className="flex-grow overflow-y-auto"
          style={{ height: "100vh" }} // Assuming Navbar height is 60px
        >
          {/* Profile component now resides within the scrollable area */}
          <Profile />
        </div>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, // ✅ Show Post when visiting /profile/:id
        element: <Post />,
      },
      // {
      //   path: "post", // ✅ Explicit /post route
      //   element: <Post />,
      // },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "friends",
        element: <FriendPage />,
      },
      {
        path: "photos",
        element: <AllPhotos />,
      },
      {
        path: "videos",
        element: <Videos />,
      },
      {
        path: "reels",
        element: <Reels />,
      }
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default App;
