import React, { useState } from "react";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebaseConfig";
import { X, Upload, Loader } from "lucide-react";
import { categories, sizes } from "../../constants/data";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditProductModal = ({ isOpen, onClose, productData, productId }) => {
  const [product, setProduct] = useState({
    ...productData,
    sizes: productData?.sizes || [],
    specification: productData?.specification || [],
    productCategories:
      productData?.productCategories || [
        { OCCASION: "" },
        { CATEGORY: "" },
        { COLLECTION: "" },
      ],
  });

  const [images, setImages] = useState(productData?.productImages || []);
  const [loading, setLoading] = useState(false);

  // 🔹 Handle Size Toggle
  const handleSizeToggle = (size) => {
    setProduct((prev) => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  // 🔹 Handle Specification Change
  const handleSpecsChange = (index, value) => {
    const updatedSpecs = [...product.specification];
    const key = Object.keys(updatedSpecs[index])[0];
    updatedSpecs[index][key] = value;
    setProduct({ ...product, specification: updatedSpecs });
  };

  // 🔹 Handle Category Change
  const handleCategoryChange = (index, value) => {
    setProduct((prev) => {
      const updatedCategories = [...prev.productCategories];
      const key = Object.keys(updatedCategories[index])[0];
      updatedCategories[index][key] = value;
      return { ...prev, productCategories: updatedCategories };
    });
  };

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // 🔹 Upload Image
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );
        const imageUrl = response.data.secure_url;
        uploadedImages.push(imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed");
      }
    }

    setImages((prev) => [...prev, ...uploadedImages]);
    setProduct((prev) => ({
      ...prev,
      productImages: [...prev.productImages, ...uploadedImages],
    }));

    setLoading(false);
    toast.success("Images uploaded successfully!");
  };

  // 🔹 Remove Image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setProduct((prev) => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index),
    }));
  };

  // 🔹 Update Product
  const updateProduct = async () => {
    try {
      setLoading(true);
      const productRef = doc(fireDB, "products", productId);

      await updateDoc(productRef, {
        ...product,
        productImages: images,
        time: Timestamp.now(),
      });

      alert("✅ Product updated successfully!");
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("❌ Failed to update product.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-screen min-h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="fixed inset-0 overflow-y-scroll bg-[#1a1b26] rounded-lg p-6 w-full max-w-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Product</h2>

        <form className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={product?.name || ""}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:border-purple-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price
            </label>
            <input
              type="number"
              value={product?.price || ""}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:border-purple-500"
            />
          </div>

          {/* Product Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Link
            </label>
            <input
              type="text"
              value={product?.productLink || ""}
              onChange={(e) =>
                setProduct({ ...product, productLink: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:border-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={product?.description || ""}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:border-purple-500"
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Available Sizes
            </label>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-2 rounded-lg border ${
                    product?.sizes?.includes(size)
                      ? "bg-purple-500 border-purple-500 text-white"
                      : "border-gray-700 text-gray-400 hover:border-purple-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Images (1000x1500)
            </label>
            <div className="grid grid-cols-3 gap-4">
              {images?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-gray-700 rounded-full text-white hover:bg-gray-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {images?.length < 6 && (
                <label className="w-full h-40 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-500">
                  <div className="text-center">
                    {loading && (
                      <Loader className="animate-spin text-gray-400 mx-auto" />
                    )}
                    <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                    <span className="mt-2 text-sm text-gray-400 block">
                      Upload Image
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    multiple
                  />
                </label>
              )}
            </div>
          </div>

          {/* Specification */}
          <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">
              Product Specification
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {product?.specification?.map((spec, index) => {
                const key = Object.keys(spec)[0];
                return (
                  <input
                    key={index}
                    type="text"
                    value={spec[key] || ""}
                    onChange={(e) => handleSpecsChange(index, e.target.value)}
                    placeholder={key}
                    className="px-3 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:border-purple-500"
                  />
                );
              })}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Category
            </label>
            <div className="flex gap-4">
              {categories
                ?.filter((_, index) => index !== 0)
                .map((item, i) => {
                  const key = Object.keys(item)[0];
                  const values = item[key];
                  const selectLabel = categories[0]["1"][i];

                  return (
                    <select
                      key={i}
                      value={
                        product?.productCategories?.[i]?.[selectLabel] || ""
                      }
                      onChange={(e) => handleCategoryChange(i, e.target.value)}
                      className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:border-purple-500"
                    >
                      <option value="" disabled>
                        {selectLabel}
                      </option>
                      {values?.map((value, index) => (
                        <option key={index} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  );
                })}
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              value={product?.discount || ""}
              onChange={(e) =>
                setProduct({ ...product, discount: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:border-purple-500"
            />
          </div>

          {/* Save + Cancel */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={updateProduct}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
