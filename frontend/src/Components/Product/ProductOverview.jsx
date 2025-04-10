import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Bookmark,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "../Layout/Layout";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebaseConfig";
import { Loading } from "../Loader/Loading";
const ProductOverview = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedSection, setExpandedSection] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const allSizes = ["XS", "S", "M", "L", "XL"];
  const care = [
    "Dry Clean Only",
    "Do not bleach",
    "Iron on low heat if needed",
    "Handle Sequin Work With Care",
  ];
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(fireDB, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "ArrowRight") {
      setCurrentImageIndex((prev) =>
        prev < productImages.length - 1 ? prev + 1 : prev
      );
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1633078654544-61b3455b9161";
    e.target.alt = "Image not available";
  };

  if (!product) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="absolute top-0 bg-gradient-to-r from-[#e8d8c3]/20 via-[#e8d8c3] to-[#e1cbc1] w-full h-16"></div>
      <div className="mt-10 min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#fbf7f6] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image Section */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row">
                {/* Thumbnails */}
                <div className="hidden lg:flex flex-col space-y-5 mr-4">
                  {product.productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-18 h-25 object-fit object-left-top overflow-hidden shadow-md transition-all duration-300 ${
                        currentImageIndex === index
                          ? "ring-2 ring-blue-500"
                          : "ring-1 ring-gray-200 hover:ring-blue-300"
                      }`}
                      aria-label={`View ${image.alt || "Product image"}`}
                    >
                      <img
                        src={image}
                        alt="Loading image"
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="relative flex-grow">
                  <div
                    className={`relative aspect-w-4 aspect-h-3 lg:aspect-h-4 overflow-hidden shadow-xl ${
                      isFullscreen ? "fixed inset-0 z-50 bg-black" : ""
                    }`}
                  >
                    <img
                      src={product.productImages[currentImageIndex]}
                      alt="Main Image"
                      className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
                      onError={handleImageError}
                    />
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition duration-200 shadow-md"
                      aria-label="Toggle fullscreen"
                    >
                      <Maximize2 className="w-5 h-5 z-10 hover:scale-105 transition-all duration-300 " />
                    </button>

                    {/* Navigation Arrows */}
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev > 0 ? prev - 1 : prev
                          )
                        }
                        disabled={currentImageIndex === 0}
                        className={`p-2 bg-white/80 rounded-r-xl shadow-md transition-opacity duration-200 ${
                          currentImageIndex === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-white"
                        }`}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev < product.productImages.length - 1
                              ? prev + 1
                              : prev
                          )
                        }
                        disabled={
                          currentImageIndex === product.productImages.length - 1
                        }
                        className={`p-2 bg-white/80 rounded-l-xl shadow-md transition-opacity duration-200 ${
                          currentImageIndex === product.productImages.length - 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-white"
                        }`}
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Thumbnails */}
                  <div className="flex lg:hidden space-x-4 mt-4 overflow-x-auto pb-2">
                    {product.productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md object-fit object-left-top overflow-hidden shadow-md transition-all duration-300 ${
                          currentImageIndex === index
                            ? "ring-2 ring-blue-500"
                            : "ring-1 ring-gray-200 hover:ring-blue-300"
                        }`}
                        aria-label={`View ${image.alt || "Product image"}`}
                      >
                        <img
                          src={image}
                          alt={`View ${image.alt || "Product image"}`}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-4">
              <h1 className="text-4xl grotesk font-semibold text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-4">
                {/* Original Price (Strikethrough) */}
                <span
                  className={`text-md text-gray-400 ${
                    product.discount === 0 ? "" : "line-through"
                  }`}
                >
                  ₹ {product.price}
                </span>
                {product.discount > 0 && (
                  <span className="text-lg font-semibold text-gray-800">
                    ₹{" "}
                    {(
                      Number(product.price) -
                      (Number(product.price) * Number(product.discount)) / 100
                    ).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-green-600 grotesk tracking-wide leading-relaxed font-medium">
                inclusive of all taxes
              </p>

              {/* Sizes */}
              <div className="my-8">
                <div className="flex justify-between mb-6 grotesk">
                  <h2 className="text-md font-light">Size</h2>
                  <h2 className="text-md font-light">Size Chart </h2>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      disabled={!product.sizes.includes(size)}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 px-4 py-2 border border-spacing-0.5 border-gray-900 transition duration-200 ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      } ${
                        !product.sizes.includes(size)
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-black hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="lg:flex gap-4 space-y-4 lg:space-y-0 my-10">
                <Link className="w-1/2 lg:w-full" to={product.productLink}>
                  <button className="w-1/2 lg:w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 hover:scale-103 transition duration-500 shadow-md">
                    Buy
                  </button>
                </Link>
                <button className="w1/2 lg:w-full flex justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-100 hover:scale-103 transition duration-500 shadow-md">
                  <span>Save</span>
                  <Bookmark />
                </button>
              </div>

              {/* Description */}
              {/* <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p> */}

              {/* Accordion Sections */}
              <div className="space-y-4">
                {["Description", "Features", "Care"].map((section) => (
                  <div key={section} className="border-t pt-4">
                    <button
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === section ? "" : section
                        )
                      }
                      className="flex justify-between items-center w-full text-left transition-all ease-in-out duration-300 hover:translate-x-1"
                    >
                      <span className="text-lg font-semibold text-gray-800">
                        {section === "Features"
                          ? "Product Details"
                          : section === "Description"
                          ? "Description"
                          : "Wash Care"}
                      </span>
                      {expandedSection === section ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    {expandedSection === section && (
                      <AnimatePresence>
                        <motion.ul
                          className="mt-4 space-y-2 text-gray-600 animate-fadeIn transition-all ease-in-out duration-600  text-sm"
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {section === "Features" ? (
                            product.specification.map((spec, index) => {
                              const [key, value] = Object.entries(spec)[0];
                              return (
                                <li key={index}>
                                  <strong>{key}:</strong> {value}
                                </li>
                              );
                            })
                          ) : section === "Description" ? (
                            <div className="text-sm grotesk tracking-wider text-light">
                              {product.description}
                            </div>
                          ) : (
                            care.map((item) => (
                              <li
                                key={item}
                                className="flex items-start hover:text-gray-800 transition-all duration-300"
                              >
                                <span className="block h-2 w-2 mt-2 mr-2 rounded-full bg-gray-400" />
                                {item}
                              </li>
                            ))
                          )}
                        </motion.ul>
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductOverview;
