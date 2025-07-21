import React, { useState, useEffect, useRef, forwardRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const BioFormPopup = forwardRef(
  ({ isOpen, onClose, initialData, onSave, loading }, ref) => {
    const [formData, setFormData] = useState({
      bioText: "",
      liveIn: "",
      relationship: "",
      workplace: "",
      education: "",
      phone: "",
      hometown: "",
    });

    const formRef = useRef(null);

    useEffect(() => {
      setFormData(
        initialData || {
          bioText: "",
          liveIn: "",
          relationship: "",
          workplace: "",
          education: "",
          phone: "",
          hometown: "",
        }
      );
    }, [initialData, isOpen]);

    useEffect(() => {
      if (isOpen && formRef.current) {
        const firstInput = formRef.current.querySelector(
          "input, textarea, select"
        );
        if (firstInput) {
          firstInput.focus();
        }
      }
    }, [isOpen]);

    useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === "Escape" && isOpen) {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
        <div
          ref={ref}
          className="bg-white dark:bg-[#252728] rounded-lg shadow-2xl flex flex-col h-[90vh] max-h-[600px] w-full max-w-xl mx-4 sm:mx-auto animate-fade-in-up"
        >
          <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-[#E4E6EA]">
              {initialData?.bioText ? "Edit Your Bio" : "Add Your Bio"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-5" ref={formRef}>
              <div>
                <label className="block text-sm font-semibold mb-1 text-black dark:text-[#E4E6EA]">
                  Bio Text (max 100 characters)
                </label>
                <textarea
                  name="bioText"
                  value={formData.bioText}
                  onChange={handleChange}
                  rows="3"
                  maxLength="100"
                  className="w-full px-4 py-2 border rounded-md resize-none bg-white dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EA] border-gray-300 dark:border-gray-600"
                  placeholder="Tell us about yourself..."
                />
                <p className="text-xs text-right text-gray-500 dark:text-gray-400">
                  {formData.bioText.length} / 100
                </p>
              </div>

              {[
                "liveIn",
                "relationship",
                "workplace",
                "education",
                "phone",
                "hometown",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold mb-1 capitalize text-black dark:text-[#E4E6EA]">
                    {field === "liveIn" ? "Current City" : field}
                  </label>
                  {field === "relationship" ? (
                    <select
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EA] border-gray-300 dark:border-gray-600"
                    >
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="In a Relationship">
                        In a Relationship
                      </option>
                      <option value="Engaged">Engaged</option>
                      <option value="Married">Married</option>
                      <option value="It's Complicated">It's Complicated</option>
                      <option value="In an Open Relationship">
                        Open Relationship
                      </option>
                      <option value="Widowed">Widowed</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#3A3B3C] text-black dark:text-[#E4E6EA] border-gray-300 dark:border-gray-600"
                    />
                  )}
                </div>
              ))}
            </form>
          </div>

          <div className="flex justify-end gap-3 p-5 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              disabled={
                loading ||
                (formData.bioText.trim() === "" && !initialData?.bioText)
              }
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default BioFormPopup;
