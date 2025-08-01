import React, { useEffect, useRef, useState } from "react";
import profileImage from "../assets/user.png";
import "../styles/Profile.css";
import { HiCamera } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
import { RxDotsHorizontal } from "react-icons/rx";
import { Outlet, useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setUserProfile } from "../redux/authSlice";
import ProfilePicturePopup from "../components/ProfilePicturePopup";
import { useLocation } from "react-router-dom";
import { RiArrowDownSFill } from "react-icons/ri";

const Profile = () => {
  const [showMore, setShowMore] = useState(false)
  const showMoreRef = useRef()
  const dispatch = useDispatch();
  const { loading, userProfile, user } = useSelector((state) => state.auth);
  const coverPicture = userProfile?.coverPhoto;
  const params = useParams();

  const [showUpload, setShowUpload] = useState(false);
  const uploadRef = useRef();
  const coverRef = useRef();


  const location = useLocation();
  const currentPath = location.pathname;
const isPostActive = currentPath === `/profile/${params.id}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Changed 'e' to 'event' for consistency
      if (uploadRef.current && !uploadRef.current.contains(event.target)) {
        setShowUpload(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleShowRef = (event) => {
      // Changed 'e' to 'event' for consistency
      if (showMoreRef.current && !showMoreRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleShowRef);

    return () => {
      document.removeEventListener("mousedown", handleShowRef);
    };
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        `https://facebook-clone-backend-production-e1fc.up.railway.app/api/profile/${params.id}`
      );
      if (res.data.success) {
        dispatch(setUserProfile(res.data.user));
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [params.id]);

  const handleCoverPicChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        "https://facebook-clone-backend-production-e1fc.up.railway.app/api/update/cover-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const coverPhoto = res.data.coverPhoto;
        if (user && user._id === userProfile?._id) {
          dispatch(setUser({ ...user, coverPhoto }));
        }
        dispatch(setUserProfile({ ...userProfile, coverPhoto }));
      }
    } catch (error) {
      console.error("Error uploading cover picture", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!userProfile) {
    return (
      <div className="w-full flex items-center justify-center bg-[#F2F4F7] dark:bg-[#18191A] text-black dark:text-white">
        Loading profile...
      </div>
    );
  }

  const { _id, firstName, lastName, profilePicture, friends } = userProfile;

  return (
    <div className="w-full mt-[60px] flex flex-col items-center bg-[#F2F4F7] dark:bg-[#18191A] text-black dark:text-white">

      <div
        className="w-full relative cover-parent bg-white dark:bg-black bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${coverPicture})`,
        }}
      >
        {coverPicture && (
  <div className="absolute  inset-0 z-10 from-white/20 dark:from-black/20 to-white/60 dark:to-black/60 bg-gradient-to-b backdrop-blur-md"></div>
)}

        <div className="relative mx-auto h-full w-full max-w-[950px] z-20">
          <div className="w-full h-full rounded-bl-lg rounded-br-lg">
            {coverPicture && (
              <img
                src={coverPicture}
                alt="Cover Picture"
                className="w-full h-full object-cover object-center shadow rounded-bl-lg rounded-br-lg"
              />
            )}
            <button
              onClick={() => coverRef?.current.click()}
              className="absolute bottom-4 right-4 px-3 py-2 text-sm flex justify-center items-center gap-1 bg-white dark:bg-[#3A3B3C] text-black dark:text-white rounded-md shadow hover:bg-gray-100 dark:hover:bg-[#4E4F50] z-30"
            >
              <HiCamera className="text-[1.2rem]" />
              <div className="text-sm hidden sm:block font-semibold">
                {coverPicture ? "Edit cover photo" : "Add cover photo"}
              </div>
              <input
                type="file"
                ref={coverRef}
                onChange={handleCoverPicChange}
                className="hidden"
              />
            </button>
          </div>
          <div className="absolute inset-0 flex justify-between pointer-events-none z-20">
            <div className="w-32 h-full bg-gradient-to-r from-black/10 dark:from-[#18191A]/80 to-transparent"></div>
            <div className="w-32 h-full bg-gradient-to-l from-black/10 dark:from-[#18191A]/80 to-transparent"></div>
          </div>
        </div>
      </div>

      {showUpload && (
        <ProfilePicturePopup ref={uploadRef} setShowUpload={setShowUpload} />
      )}

      <div className="dark:bg-[#252728] bg-white w-full shadow-md">
        <div className="profile-user-info flex flex-col items-center px-2 sm:px-6 relative mx-auto max-w-[950px]">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center pb-4">
            <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4 z-40">
              <div className="w-[180px] h-[180px] group -translate-y-7 bg-white dark:bg-black rounded-full object-cover border-4 border-gray-300 relative dark:border-[#252728]">
                <img
                  src={profilePicture || profileImage}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover "
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 cursor-pointer transition rounded-full" />
                <div
                  onClick={() => setShowUpload(true)}
                  className="absolute p-2 cursor-pointer bg-gray-200 dark:text-[#E2E5E9] hover:bg-[#D6D9DD] dark:bg-[#3B3D3E] dark:hover:bg-[#3B3D3E] text-[1.2rem] rounded-full bottom-2 right-2"
                >
                  <HiCamera />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center lg:items-start -translate-y-2">
                <div className="font-bold text-3xl dark:text-[#E2E5E9]">
                  {firstName} {lastName}
                </div>
                <div className="text-sm dark:text-[#E4E6EA] font-semibold text-gray-600 hover:underline cursor-pointer">
                  {friends?.length || 0} friends
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2 profile-buttons">
              <button className="bg-[#0866FF] hover:bg-[#0861F2] py-2 px-4 text-[14px] font-semibold rounded-lg text-white flex items-center gap-1 cursor-pointer">
                <FiPlus className="h-full text-white" />
                Add to story
              </button>
              <button className="bg-[#E2E5E9] hover:bg-[#D6D9DD] dark:text-[#E4E6EA] dark:bg-[#3B3D3E] dark:hover:bg-[#3B3D3E] py-2 px-4 text-[14px] font-semibold rounded-lg text-black flex items-center gap-1 cursor-pointer">
                <MdEdit className="text-[1rem] font-bolds" />
                Edit profile
              </button>
              <button className="py-2 px-4 bg-[#E2E5E9] hover:bg-[#D6D9DD] dark:bg-[#3B3D3E] dark:hover:bg-[#4F5152] dark:text-[#E4E6EA] rounded-lg text-black font-bold cursor-pointer flex justify-center items-center">
                <BiChevronDown />
              </button>
            </div>
          </div>

          <div className="w-full border-t flex justify-between items-center border-gray-300 dark:border-[#3A3B3C] pt-2">
            <ul className="flex font-medium text-[14px] relative items-center gap-1">
              <NavLink
                to={`/profile/${_id}`}
                className={() =>
                  isPostActive
                    ? "border-b-4 border-blue-600 text-blue-600 dark:text-[#E4E6EA] cursor-pointer"
                    : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                }
              >
                <li>
                  <div className="px-4 py-3">Posts</div>
                </li>
              </NavLink>
              <NavLink
                to={`/profile/${_id}/about`}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-blue-600 text-blue-600 dark:text-[#E4E6EA] cursor-pointer"
                    : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                }
              >
                <li>
                  <div className="px-4 py-3">About</div>
                </li>
              </NavLink>
              <NavLink
                to={`/profile/${_id}/friends`}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-blue-600 text-blue-600 dark:text-[#E4E6EA] cursor-pointer"
                    : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                }
              >
                <li className="friend-link">
                  <div className="px-4 py-3">Friends</div>
                </li>
              </NavLink>
              <NavLink
                to={`/profile/${_id}/photos`}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-blue-600 text-blue-600 dark:text-[#E4E6EA] cursor-pointer"
                    : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                }
              >
                <li className="hidden sm:block">
                  <div className="px-4 py-3">Photos</div>
                </li>
              </NavLink>
              <NavLink
                to={`/profile/${_id}/videos`}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-blue-600 text-blue-600 dark:text-[#E4E6EA] cursor-pointer"
                    : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                }
              >
                <li className="hidden sm:block">
                  <div className="px-4 py-3">Videos</div>
                </li>
              </NavLink>
              <NavLink
                to={`/profile/${_id}/reels`}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-blue-600 text-blue-600 dark:text-[#E4E6EA] cursor-pointer"
                    : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                }
              >
                <li className="hidden sm:block">
                  <div className="px-4 py-3">Reels</div>
                </li>
              </NavLink>
              <li
                onClick={() => setShowMore(!showMore)}
                className="block sm:hidden"
              >
                <div className="hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg flex items-center gap-1 hover:text-blue-600 dark:text-[#AEB1B6] cursor-pointer px-4 py-3 text-[#65676B]">
                  <div>More</div>
                  <div>
                    <RiArrowDownSFill />
                  </div>
                </div>
                <div className={`absolute min bg-gray-200 rounded-lg mt-2 w-[100px] h-max  ${showMore ? "p-2" : ""}`}>
                  <div
                    ref={showMoreRef}
                    className={`${
                      !showMore ? "hidden" : "blocks"
                    }  flex flex-col gap-1`}
                  >
                    <NavLink
                      to={`/profile/${_id}/friends`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 dark:text-[#E4E6EA] p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3B3D3E] cursor-pointer"
                          : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                      }
                    >
                      <li className="friend-link-copy">
                        <div className="px-4 py-3">Friends</div>
                      </li>
                    </NavLink>
                    <NavLink
                      to={`/profile/${_id}/photos`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 dark:text-[#E4E6EA] p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3B3D3E] cursor-pointer"
                          : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                      }
                    >
                      <li>
                        <div className="px-4 py-3">Photos</div>
                      </li>
                    </NavLink>
                    <NavLink
                      to={`/profile/${_id}/videos`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 dark:text-[#E4E6EA] p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3B3D3E] cursor-pointer"
                          : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                      }
                    >
                      <li className="">
                        <div className="px-4 py-3">Videos</div>
                      </li>
                    </NavLink>
                    <NavLink
                      to={`/profile/${_id}/reels`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 dark:text-[#E4E6EA] p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3B3D3E] cursor-pointer"
                          : "hover:bg-gray-200 dark:hover:bg-[#3B3D3E] rounded-lg text-[#65676B] dark:text-[#AEB1B6] cursor-pointer"
                      }
                    >
                      <li>
                        <div className="px-4 py-3">Reels</div>
                      </li>
                    </NavLink>
                  </div>
                </div>
              </li>
            </ul>
            <div className="rounded-lg py-2 bg-[#E2E5E9] hover:bg-[#D6D9DD] cursor-pointer dark:bg-[#3B3D3E] dark:hover:bg-[#4F5152] px-4">
              <RxDotsHorizontal />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex-grow mx-auto max-w-[950px] lg:py-5 lg:px-0 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
