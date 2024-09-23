// CustomModal.js
import React from "react";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  content,
  buttonText,
  onButtonClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white flex flex-col justify-center items-center rounded-lg p-6 w-full max-w-md mx-4 relative">
       
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="mb-4">{content}</div>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onButtonClick}
            className="bg-coffee text-white px-4 py-2 rounded hover:bg-coffee-dark"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
