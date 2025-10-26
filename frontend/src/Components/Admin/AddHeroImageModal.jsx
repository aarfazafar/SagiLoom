import React, { useState } from "react";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebaseConfig";
import { X, Upload, Loader } from "lucide-react";
import toast from "react-hot-toast";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AddHeroImageModal = ({ onClose, onImageAdded }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Upload to Cloudinary
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setImageUrl(res.data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Save to Firestore
  const handleSave = async () => {
    if (!imageUrl || !title.trim()) {
      toast.error("Image and title are required");
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(fireDB, "heroImages"), {
        imageUrl,
        title,
        subtitle,
        createdAt: new Date().toISOString(),
      });

      const newImage = {
        id: docRef.id,
        imageUrl,
        title,
        subtitle,
      };

      onImageAdded(newImage);
      toast.success("Hero image added!");
      onClose();
    } catch (err) {
      console.error("Error adding hero image:", err);
      toast.error("Failed to save image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1b23] p-6 rounded-xl w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">Add Hero Image</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2a2b37] text-white border border-gray-700 focus:border-purple-500 outline-none"
            placeholder="Enter title"
          />
        </div>

        {/* Subtitle Input */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2a2b37] text-white border border-gray-700 focus:border-purple-500 outline-none"
            placeholder="Enter subtitle"
          />
        </div>

        {/* Upload Section */}
        {!imageUrl ? (
          <label className="w-full h-40 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-500">
            <div className="text-center">
              {loading ? (
                <Loader className="animate-spin text-gray-400 mx-auto" />
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <span className="mt-2 text-sm text-gray-400 block">
                    Upload Image
                  </span>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        ) : (
          <div className="relative w-full h-40 mt-2">
            <img
              src={imageUrl}
              alt="Hero"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-2 right-2 p-1 bg-gray-700 rounded-full text-white hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin inline-block" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHeroImageModal;
