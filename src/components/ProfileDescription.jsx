import React, { useState } from "react";
import { MdPublic } from "react-icons/md";

const ProfileDescription = ({setShowDesInput}) => {
  const [description, setDescription] = useState("");
  const maxCharacters = 101;

  const handleChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setDescription(e.target.value);
    }
  };

  const handleSave = () => {
    console.log("Saving description:", description);
    setShowDesInput(false);
  };

  const handleCancel = () => {
    setDescription("");
    setShowDesInput(false)
    console.log("Cancelled");
  };

  return (
    <div className="w-full">
      <div className="relative mb-4">
        <textarea
          className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Describe who you are"
          rows="4" // Adjust rows as needed to match the visual height
          value={description}
          onChange={handleChange}
          maxLength={maxCharacters}
        ></textarea>
        <div className="text-sm text-gray-500 text-right mt-1">
          {maxCharacters - description.length} characters remaining
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-gray-600 gap-2 text-lg">
          <MdPublic />
          <div className="text-[14px]">Public</div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-[14px] text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-[14px] text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={description.length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDescription;
