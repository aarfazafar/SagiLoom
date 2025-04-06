import React, { useContext, useState } from "react";
import { X, Upload } from "lucide-react";
import { categories, sizes } from "../../constants/data";
import myContext from "../../context/myContext";
import {
  auth,
  fireDB,
  imageStorage,
} from "../../firebaseConfig/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../Loader/Loader";
const AddProduct = () => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    productLink: "",
    description: "",
    sizes: [],
    productImages: [],
    specification: [
      { Fabric: "" },
      { Pattern: "" },
      { Color: "" },
      { Fit: "" },
    ],
    discount: 0,
    productCategories: [{ OCCASION: "" }, { CATEGORY: "" }, { COLLECTION: "" }],
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // const handleImageUpload = (e) => {
  //   const files = e.target.files;
  //   if (files && files.length > 0 && images.length < 6) {
  //     const newImages = Array.from(files)
  //       .slice(0, 6 - images.length)
  //       .map((file) => URL.createObjectURL(file));
  //     setImages([...images, ...newImages]);

  //     setProduct((prev) => ({
  //       ...prev,
  //       productImages: [...prev.productImages, ...newImages],
  //     }));
  //   }
  // };

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  // console.log("Cloud Name:", CLOUD_NAME);
  // console.log("Upload Preset:", UPLOAD_PRESET);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedImages = [];
    setLoading(true);

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      // formData.append("eager", "q_auto,f_auto");
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );

        // Get the secure URL from the response
        const imageUrl = response.data.secure_url;
        const public_id = response.data.public_id;
        uploadedImages.push(imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setLoading(false);
      }
    }

    setImages([...images, ...uploadedImages]);
    // Update the state with uploaded image URLs
    setProduct((prev) => ({
      ...prev,
      productImages: [...prev.productImages, ...uploadedImages],
    }));
    toast.success("Images uploaded successfully!");
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setProduct((prev) => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index),
    }));
  };

  // const removeImage = async (index) => {
  //   const imageToRemove = images[index];

  //   if (!imageToRemove?.public_id) {
  //     console.error("No public_id found for the image.");
  //     return;
  //   }

  //   try {
  //     await axios.post(
  //       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/delete_by_token`,
  //       {
  //         public_id: imageToRemove.public_id,
  //       },
  //       {
  //         auth: {
  //           username: API_KEY,
  //           password: API_SECRET,
  //         },
  //       }
  //     );

  //     console.log("Image deleted from Cloudinary!");

  //     // Remove from state
  //     const updatedImages = images.filter((_, i) => i !== index);
  //     const updatedProductImages = product.productImages.filter(
  //       (_, i) => i !== index
  //     );

  //     setImages(updatedImages);
  //     setProduct((prev) => ({
  //       ...prev,
  //       productImages: updatedProductImages,
  //     }));

  //     toast.success("Image removed successfully!");
  //   } catch (error) {
  //     console.error("Error deleting image:", error);
  //     toast.error("Failed to delete image from Cloudinary.");
  //   }
  // };

  const handleSpecsChange = (index, value) => {
    setProduct((prev) => {
      const updatedSpecs = [...prev.specification];
      const key = Object.keys(updatedSpecs[index])[0];
      updatedSpecs[index] = { [key]: value };
      return { ...prev, specification: updatedSpecs };
    });
  };

  const handleCategoryChange = (index, value) => {
    setProduct((prev) => {
      const updatedCategories = [...prev.productCategories];
      const key = Object.keys(updatedCategories[index])[0];
      updatedCategories[index] = { [key]: value };
      return { ...prev, productCategories: updatedCategories };
    });
  };

  const addProductFunction = async () => {
    if (
      product.name.trim() === "" ||
      product.price.trim() === "" ||
      product.productLink.trim() === "" ||
      product.description.trim() === "" ||
      product.productImages.length === 0 ||
      product.productCategories.some(
        (category) => Object.values(category)[0].trim() === ""
      ) ||
      product.specification.some((spec) => Object.values(spec)[0].trim() === "")
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");

      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-16 pt-5 pr-8 pb-2 md:p-10 bg-[#1a1b23] w-full">
      <h2 className="text-xl font-semibold text-white mb-6">Add New Product</h2>
      <form className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => {
              setProduct({
                ...product,
                name: e.target.value,
              });
            }}
            className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:outline-none focus:border-purple-500"
            placeholder="Enter product name"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price
          </label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => {
              setProduct({
                ...product,
                price: e.target.value,
              });
            }}
            className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:outline-none focus:border-purple-500"
            placeholder="Enter price"
          />
        </div>

        {/* Product Link */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Link
          </label>
          <input
            type="text"
            value={product.productLink}
            onChange={(e) => {
              setProduct({
                ...product,
                productLink: e.target.value,
              });
            }}
            className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:outline-none focus:border-purple-500"
            placeholder="Enter buy link"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={product.description}
            onChange={(e) => {
              setProduct({
                ...product,
                description: e.target.value,
              });
            }}
            className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:outline-none focus:border-purple-500"
            placeholder="Enter product description"
          />
        </div>

        {/* Available Sizes */}
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
                  selectedSizes.includes(size)
                    ? "bg-purple-500 border-purple-500 text-white"
                    : "border-gray-700 text-gray-400 hover:border-purple-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Product Images */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Images
          </label>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
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
            {images.length < 6 && (
              <label className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-500">
                <div className="text-center">
                  {loading && (
                    <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
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
          <p className="text-sm text-gray-400 mt-2">
            Upload up to 6 images. First image will be the cover.
          </p>
        </div>

        {/* Product Specification */}
        <div className="p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">
            Product Specification
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {product.specification.map((spec, index) => {
              const key = Object.keys(spec)[0]; // Get the key dynamically (Fabric, Pattern, Color, Fit)
              return (
                <input
                  key={index}
                  type="text"
                  name={key.toLowerCase()}
                  value={spec[key]} // Dynamically access the value
                  onChange={(e) => handleSpecsChange(index, e.target.value)}
                  placeholder={`${key} (e.g., ${
                    key === "Fabric"
                      ? "Cotton"
                      : key === "Pattern"
                      ? "Foil Print"
                      : key === "Color"
                      ? "Yellow"
                      : "Regular Fit"
                  })`}
                  className="px-3 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                />
              );
            })}
          </div>
        </div>

        {/*Category*/}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Category
          </label>
          <div className="flex gap-4">
            {categories
              .filter((_, index) => index !== 0)
              .map((item, i) => {
                const key = Object.keys(item)[0];
                const values = item[key];

                const selectLabel =
                  categories[0][1][i] || "Select Product Category";
                return (
                  <select
                    key={i}
                    value={product.productCategories[i][selectLabel]}
                    onChange={(e) => handleCategoryChange(i, e.target.value)}
                    className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                  >
                    <option disabled>{selectLabel}</option>
                    {values.map((value, index) => (
                      <option
                        className="first-letter:uppercase text-sm"
                        key={index}
                      >
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
            name="discount"
            value={product.discount}
            onChange={(e) => {
              setProduct({
                ...product,
                discount: e.target.value,
              });
            }}
            className="w-full px-4 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          type="button"
          onClick={addProductFunction}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors w-full"
        >
          Add Product
          {loading && (
            <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
