import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BioFormPopup from "./BioFormPopup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUserProfile, setUser } from "../redux/authSlice";

const Intro = () => {
  const { user, userProfile } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [isBioPopupOpen, setIsBioPopupOpen] = useState(false);
  const [currentBioData, setCurrentBioData] = useState(null);
  const bioRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleAddBioClick = () => {
    setCurrentBioData(null);
    setIsBioPopupOpen(true);
  };

  const handleEditBioClick = () => {
    setCurrentBioData(userProfile?.bio);
    setIsBioPopupOpen(true);
  };

  const handleSaveBio = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.put(
        "https://facebook-clone-backend-production-e1fc.up.railway.app/api/update-bio",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        const updatedBio = res.data.bio;

        dispatch(setUserProfile({ ...userProfile, bio: updatedBio }));
        dispatch(setUser({ ...user, bio: updatedBio }));

        setIsBioPopupOpen(false);
      } else {
        toast.error(res.data.message || "Failed to update bio.");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while saving bio."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hidePopup = (event) => {
      if (
        bioRef.current &&
        !bioRef.current.contains(event.target) &&
        isBioPopupOpen &&
        !loading
      ) {
        setIsBioPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", hidePopup);
    return () => document.removeEventListener("mousedown", hidePopup);
  }, [isBioPopupOpen, loading]);

  const hasBioText = userProfile?.bio?.bioText || user?.bio?.bioText;

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full">
        {hasBioText ? (
          <button
            onClick={handleEditBioClick}
            className="bg-[#E2E5E9] dark:bg-[#3A3B3C] text-sm font-bold text-gray-900 dark:text-white rounded-lg p-2 w-full hover:bg-[#d0d4d8] dark:hover:bg-[#4E4F50] transition-colors"
          >
            Edit details
          </button>
        ) : (
          <button
            onClick={handleAddBioClick}
            className="bg-[#E2E5E9] dark:bg-[#3A3B3C] text-sm font-bold text-gray-900 dark:text-white rounded-lg p-2 w-full hover:bg-[#d0d4d8] dark:hover:bg-[#4E4F50] transition-colors"
          >
            Add Bio
          </button>
        )}
      </div>

      {hasBioText && (
        <div className="w-full">
          <button className="bg-[#E2E5E9] dark:bg-[#3A3B3C] text-sm font-bold text-gray-900 dark:text-white rounded-lg p-2 w-full hover:bg-[#d0d4d8] dark:hover:bg-[#4E4F50] transition-colors">
            Add Featured
          </button>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="text-white text-xl font-semibold animate-pulse">
            Saving...
          </div>
        </div>
      )}

      <BioFormPopup
        isOpen={isBioPopupOpen}
        onClose={() => setIsBioPopupOpen(false)}
        initialData={currentBioData}
        onSave={handleSaveBio}
        ref={bioRef}
        loading={loading}
      />
    </div>
  );
};

export default Intro;
