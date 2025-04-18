import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Product({ product }) {
  const [hovered, setHovered] = useState(false);

  const {
    name,
    price,
    productLink,
    description,
    productImages,
    productCategories,
  } = product;

  const trimDescription = (text, type) => {
    const wordLimit = type === "title" ? 4 : 6;
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-[#fdf6f0] rounded-2xl overflow-hidden shadow-[0_8px_20px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.15)] transition duration-500 ease-in-out w-80 m-1 sm:m-0 sm:w-80 border border-[#e7dcd0]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        // to={productLink}
        to={`/productinfo/${product.id}`}
        rel="noopener noreferrer"
      >
        <div className="relative h-100 w-full">
          <img
            src={productImages[0]}
            alt={name}
            className={`absolute top-0 left-0 w-full h-full object-cover object-left-top transition-opacity duration-500 ease-in-out ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={productImages[1]}
            alt={name}
            className={`absolute top-0 left-0 w-full h-full object-cover object-left-top transition-opacity duration-500 ease-in-out ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
          <span className="absolute top-3 left-3 bg-[#e8d8c3] text-[#5a4637] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            {productCategories[0]?.OCCASION}
          </span>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-lg grotesk font-semibold text-[#3a2e23] tracking-tight">
            {trimDescription(name, "title")}
          </h3>
          <p className="grotesk text-sm text-[#5a4637]">
            {trimDescription(description, "desc")}
          </p>

          <div className="flex justify-between items-center mt-3">
            {/* <p className="text-lg courier font-semibold text-[#a9745b]">
              ₹{price}
            </p> */}

            <div className="flex items-center gap-4">
              {/* Original Price (Strikethrough) */}
              <span
                className={`text-lg courier font-semibold text-[#a9745b] ${
                  product.discount === 0 ? "" : "line-through"
                }`}
              >
                ₹ {product.price}
              </span>
              {product.discount > 0 && (
                <span className="text-lg font-semibold text-gray-800">
                  ₹{" "}
                  {Math.trunc(
                    Number(product.price) -
                      (Number(product.price) * Number(product.discount)) / 100
                  )}
                </span>
              )}
            </div>
            <button className="text-sm bg-[#3a2e23] text-white pt-1 pb-[6px] px-4 rounded-full hover:bg-black hover:scale-105 transition-all duration-300 shadow-sm">
              View
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
