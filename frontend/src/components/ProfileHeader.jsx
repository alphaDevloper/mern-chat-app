import React, { useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { LogOutIcon } from "lucide-react";

function ProfileHeader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { authUser, logout, updateProfile } = useAuthStore();
  const fileInputRef = useRef();
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // getting first file from file list
    if (!file) return; // exiting if no file is selected

    // FileReader is a built-in JavaScript class for reading files
    const reader = new FileReader(); // creating a fileReader for reading file that will read content of selected file
    // starts reading the file, converting the image file into a string
    reader.readAsDataURL(file); // reading the file as base64

    // an eventhandler that browser automatically calls
    reader.onloadend = async () => {
      const base64Image = reader.result; // extracting the file data (string form of image)
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="user image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* username */}
          <div>
            <h3 className="font-semibold text-gray-900  max-w-[180px] truncate">
              {authUser.fullName}
            </h3>

            <p className="text-xs text-gray-600">Online</p>
          </div>
        </div>{" "}
        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
