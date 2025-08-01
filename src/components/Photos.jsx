import React, { useEffect, useState } from "react";
import axios from "axios";

const Photos = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchRecentImages = async () => {
      try {
        const res = await axios.get(
          "https://facebook-clone-backend-production-e1fc.up.railway.app/api/recent-uploads",
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

  return (
    <div className="flex flex-col gap-4 dark:bg-[#1C1C1D]">
      {/* Title */}
      <div className="flex justify-between dark:bg-[#1C1C1D] items-center">
        <div className="font-bold text-xl">Photos</div>
        <div className="text-blue-500 cursor-pointer">See all photos</div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-3 gap-2">
        {images.map((img) => (
          <img
            key={img.public_id}
            src={img.url}
            alt="upload"
            className="w-full h-32 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Photos;
