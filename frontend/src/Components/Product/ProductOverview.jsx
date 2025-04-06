import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Bookmark,
} from "lucide-react";
import { Layout } from "../Layout/Layout";

const ProductOverview = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedSection, setExpandedSection] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const product = {
    name: "Premium Merino Wool Sweater",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 128,
    description:
      "Luxurious merino wool sweater designed for comfort and style. Perfect for any occasion.",
    images: [
      {
        id: 1,
        main: "https://kisah.in/cdn/shop/files/KA-1011-E101-07.jpg?v=1742891663&width=5000",
        thumbnail:
          "https://kisah.in/cdn/shop/files/KA-1011-E101-07.jpg?v=1742891663&width=5000",
      },
      {
        id: 2,
        main: "https://kisah.in/cdn/shop/files/KA-1011-E101-05.jpg?v=1742891663&width=5000",
        thumbnail:
          "https://kisah.in/cdn/shop/files/KA-1011-E101-05.jpg?v=1742891663&width=5000",
      },
      {
        id: 3,
        main: "https://kisah.in/cdn/shop/files/KA-1011-E101-03.jpg?v=1742891662&width=5000",
        thumbnail:
          "https://kisah.in/cdn/shop/files/KA-1011-E101-03.jpg?v=1742891662&width=5000",
      },
      {
        id: 4,
        main: "https://kisah.in/cdn/shop/files/KA-1011-E101-06.jpg?v=1742891663&width=5000",
        thumbnail:
          "https://kisah.in/cdn/shop/files/KA-1011-E101-06.jpg?v=1742891663&width=5000",
      },
      {
        id: 5,
        main: "https://kisah.in/cdn/shop/files/KA-1011-E101-02.jpg?v=1742891662&width=5000",
        thumbnail:
          "https://kisah.in/cdn/shop/files/KA-1011-E101-02.jpg?v=1742891662&width=5000",
      },
      {
        id: 6,
        main: "https://kisah.in/cdn/shop/files/KA-1011-E101-04.jpg?v=1742891662&width=5000",
        thumbnail:
          "https://kisah.in/cdn/shop/files/KA-1011-E101-04.jpg?v=1742891662&width=5000",
      },
    ],
    colors: [
      { name: "Black", code: "#000000" },
      { name: "Navy", code: "#000080" },
      { name: "Gray", code: "#808080" },
      { name: "Burgundy", code: "#800020" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L", "XL"],
    features: {
      // "100% Premium Merino Wool",
      // "Moisture-wicking",
      // "Temperature regulating",
      // "Naturally odor-resistant",
      fabric: "Cotton",
      color: "Yellow",
      pattern: "Floral",
      fit: "Regular",
    },
    care: [
      "Machine wash cold",
      "Lay flat to dry",
      "Do not bleach",
      "Iron on low heat if needed",
    ],
  };

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

  return (
    <Layout>
      <div className="mt-10 min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row">
                {/* Thumbnails */}
                <div className="hidden lg:flex flex-col space-y-4 mr-4">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                        currentImageIndex === index
                          ? "ring-2 ring-blue-500"
                          : "ring-1 ring-gray-200 hover:ring-blue-300"
                      }`}
                      aria-label={`View ${image.alt}`}
                    >
                      <img
                        src={image.thumbnail}
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
                    className={`relative aspect-w-4 aspect-h-3 lg:aspect-h-4 rounded-lg overflow-hidden ${
                      isFullscreen ? "fixed inset-0 z-50 bg-black" : ""
                    }`}
                  >
                    <img
                      src={product.images[currentImageIndex].main}
                      alt={product.images[currentImageIndex].alt}
                      className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
                      onError={handleImageError}
                    />

                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
                      aria-label="Toggle fullscreen"
                    >
                      <Maximize2 className="w-5 h-5" />
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
                        className={`p-2 bg-white/80 rounded-r-lg transition-opacity duration-200 ${
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
                            prev < product.images.length - 1 ? prev + 1 : prev
                          )
                        }
                        disabled={
                          currentImageIndex === product.images.length - 1
                        }
                        className={`p-2 bg-white/80 rounded-l-lg transition-opacity duration-200 ${
                          currentImageIndex === product.images.length - 1
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
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                          currentImageIndex === index
                            ? "ring-2 ring-blue-500"
                            : "ring-1 ring-gray-200 hover:ring-blue-300"
                        }`}
                        aria-label={`View ${image.alt}`}
                      >
                        <img
                          src={image.thumbnail}
                          alt={image.alt}
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
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="text-2xl font-bold text-gray-700 ml-2">
                ₹ {product.price}
              </div>
              <div className="ml-2 text-green-700 font-semibold">
                inclusive of all taxes
              </div>

              <div className="transform transition-all duration-300 hover:translate-x-2">
                <h2 className="text-sm font-medium text-gray-900">Size</h2>
                <div className="mt-3 grid grid-cols-5 gap-3">
                  {product.sizes.map((size) => {
                    const isAvailable = product.availableSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        className={`
                    py-2 text-sm font-medium rounded-md transition-all duration-300
                    ${
                      isAvailable
                        ? selectedSize === size
                          ? "bg-black text-white transform scale-95"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-105"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                    }
                  `}
                        disabled={!isAvailable}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:flex space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Buy
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Bookmark />
                </button>
              </div>
              <p className="text-gray-600">{product.description}</p>

              <div className="space-y-4">
                {["Features", "Care"].map((section) => (
                  <div key={section} className="border-t pt-4">
                    <button
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === section ? "" : section
                        )
                      }
                      className="flex justify-between items-center w-full text-left transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="text-lg font-medium text-gray-900">
                        {section}
                      </span>
                      {expandedSection === section ? (
                        <ChevronUp className="w-5 h-5 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                      )}
                    </button>
                    {expandedSection === section && (
                      <ul className="mt-4 space-y-2 text-gray-600 animate-fadeIn">
                        {section === "Features"
                          ? Object.entries(product.features).map(
                              ([key, value]) => (
                                <li key={key}>
                                  <strong>{key}:</strong> {value}
                                </li>
                              )
                            )
                          : product.care.map((item) => (
                              <li
                                key={item}
                                className="flex items-start transition-all duration-300 hover:text-gray-800"
                              >
                                <span className="block h-2 w-2 mt-2 mr-2 rounded-full bg-gray-400" />
                                {item}
                              </li>
                            ))}
                      </ul>
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
