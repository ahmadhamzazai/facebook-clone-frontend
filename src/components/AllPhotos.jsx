import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPhotos = () => {
  const [images, setImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    const fetchRecentImages = async () => {
      try {
        const res = await axios.get(
          "https://facebook-clone-backend-production-e1fc.up.railway.app/api/recent-uploads-all",
          {
            withCredentials: true,
          }
        );
        setImages(res.data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchRecentImages();
  }, []);

  const imagesToDisplay = showAllImages ? images : images.slice(0, 6);

  return (
    <div className="flex flex-col bg-white rounded-lg p-5  gap-4">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl">Pictures</div>
        {images.length > 6 && !showAllImages && (
          <div
            className="text-blue-500 cursor-pointer text-[14px] hover:text-blue-600 hover:underline"
            onClick={() => setShowAllImages(true)}
          >
            See all pictures
          </div>
        )}
        {images.length > 6 && showAllImages && (
          <div
            className="text-blue-500 cursor-pointer text-[14px] hover:text-blue-600 hover:underline"
            onClick={() => setShowAllImages(false)}
          >
            Show less
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {imagesToDisplay.map((img) => (
          <img
            key={img.public_id}
            src={img.url}
            alt="upload"
            className="w-full h-[30vw] object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default AllPhotos;
