import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebaseConfig";
import axios from "axios";
// import { toast } from "react-toastify";
import { Upload, Loader, X, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AddBestseller = () => {
  const [poster, setPoster] = useState(null);
  const [posterUrl, setPosterUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all existing products for dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productSnapshot = await getDocs(collection(fireDB, "products"));
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (err) {
        console.error("Failed to fetch products", err);
        toast.error("Could not load products");
      }
    };

    fetchProducts();
  }, []);

  // Cloudinary upload
  const handlePosterUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    setLoading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setPosterUrl(res.data.secure_url);
      toast.success("Poster uploaded!");
      setPoster(res.data.secure_url);
    } catch (err) {
      console.error("Poster upload failed", err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Add bestseller data to Firestore
  const addBestseller = async () => {
    if (!posterUrl || !productId) {
      toast.error("Poster and Product are required");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(fireDB, "bestsellers"), {
        posterUrl,
        productId,
      });
      toast.success("Bestseller added!");
      setPoster(null);
      setPosterUrl("");
      setProductId("");
    } catch (err) {
      console.error("Error adding bestseller:", err);
      toast.error("Could not add bestseller");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-16 pt-5 pr-8 pb-2 md:p-10 bg-[#1a1b23] w-full h-screen">
      <h2 className="text-xl font-semibold text-white mb-6">Add Bestseller</h2>

      <form className="space-y-6">
        {/* Product Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Product
          </label>
          <div className="relative">
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-4 py-2 bg-[#13141c] text-white border border-gray-700 rounded-lg appearance-none pr-10"
            >
              <option value="" disabled>
                -- Choose a product --
              </option>
              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.title} {product.id}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute top-3 right-3 text-gray-400" />
          </div>

          {productId && (
            <div className="flex items-center gap-3 mt-2 bg-[#2a2b37] p-2 rounded-lg">
              <img
                src={
                  products.find((p) => p.id === productId)?.productImages[0] ||
                  "https://via.placeholder.com/40"
                }
                alt="Product"
                className="h-20 w-16 rounded object-cover"
              />
              <p className="text-white text-sm">
                {
                  products.find((p) => p.id === productId)?.name ||
                  "Product not found"
                }
              </p>
            </div>
          )}
        </div>

        {/* Poster Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Bestseller Poster
          </label>
          {poster ? (
            <div className="relative w-50 h-auto mt-4">
              <img
                src={poster}
                alt="Poster"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setPoster("")}
                className="absolute top-2 right-2 p-1 bg-gray-700 rounded-full text-white hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="w-50 h-32 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-500">
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
                onChange={handlePosterUpload}
              />
            </label>
          )}
        </div>

        <button
          type="button"
          onClick={addBestseller}
          className="px-6 py-2 mt-16 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors w-50"
        >
          Add 
          {loading && (
            <Loader className="ml-2 animate-spin inline-block align-middle" />
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBestseller;
