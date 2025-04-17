import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

import { fireDB } from "../../firebaseConfig/firebaseConfig";
import myContext from "../../context/myContext";
import Loader from "../Loader/Loader";
import {
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const context = useContext(myContext);
  const { loading, getAllProducts } = context;

  const [entriesPerPage, setEntriesPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "products", id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-[#1a1b23]">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 mt-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="bg-[#13141c] text-white border border-gray-700 rounded-lg px-3 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <span className="text-gray-400">entries</span>
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-4 pr-10 py-2 bg-[#13141c] rounded-lg text-white border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <Link
          to={"/admin/addproduct"}
          className="p-2 md:px-4 md:py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
        >
          <span>Add new</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>

      <div className="w-full md:w-[500px] lg:w-[800px] xl:w-[1200px] 2xl:w-[1250px] overflow-x-auto">
        <table className="table-auto w-full bg-[#13141c] rounded-lg">
          <thead>
            <tr>
              <th className="min-w-[320px] px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Images
              </th>
              <th className="min-w-[100px] px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Product ID
              </th>
              <th className="min-w-[180px] px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Name
              </th>
              <th className="min-w-[260px] px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Description
              </th>
              <th className="min-w-[100px] px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Price
              </th>
              <th className="min-w-[100px] px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Discount
              </th>
              <th className="min-w-[120px] px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Sizes
              </th>
              <th className="min-w-[220px] px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Specifications
              </th>
              <th className="min-w-[320px] px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Categories
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Added Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Added Time
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-[#1f2029] transition-colors"
              >
                <td className="min-w-[120px] px-6 py-4 border-b border-gray-700">
                  <div className="flex gap-2">
                    {product.productImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ))}
                  </div>
                </td>
                <td className="min-w-[100px] px-6 py-4 text-gray-300 border-b border-gray-700">
                  {product.id}
                </td>
                <td className="min-w-[180px] px-6 py-4 text-gray-300 border-b border-gray-700">
                  <div>
                    <span className="font-medium text-white">
                      {product.name}
                    </span>
                    <a
                      href={product.productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">View</span>
                    </a>
                  </div>
                </td>
                <td className="min-w-[260px] px-6 py-4 text-gray-300 border-b border-gray-700">
                  {product.description}
                </td>
                <td className="min-w-[100px] px-6 py-4 text-gray-300 border-b border-gray-700">
                  <span className="font-semibold text-purple-500">
                    ₹{product.price}
                  </span>
                </td>
                <td className="min-w-[100px] px-6 py-4 text-gray-300 border-b border-gray-700">
                  {product.discount > 0 ? (
                    <span className="text-green-500">
                      {product.discount}% off
                    </span>
                  ) : (
                    <span className="text-gray-500">No discount</span>
                  )}
                </td>
                <td className="min-w-[120px] px-6 py-4 border-b border-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-1 text-xs bg-gray-700 text-white rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="	min-w-[220px] px-6 py-4 text-gray-300 border-b border-gray-700">
                  <div className="space-y-1">
                    {product.specification.map((spec, index) => {
                      const [key, value] = Object.entries(spec)[0];
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-gray-500">{key}:</span>
                          <span className="text-white">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className="min-w-[320px] px-6 py-4 text-gray-300 border-b border-gray-700">
                  <div className="space-y-1">
                    {product.productCategories.map((category, index) => {
                      const [key, value] = Object.entries(category)[0];
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-gray-500">{key}:</span>
                          <span className="text-white">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-300 border-b border-gray-700">
                  {/* {product.date} */}date
                </td>
                <td className="px-6 py-4 text-gray-300 border-b border-gray-700">
                  {/* {product.time} */}time
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    {/* <button className="p-1.5 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-blue-400/10">
                      <Eye className="w-4 h-4" />
                    </button> */}
                    {/* <button className="p-1.5 text-green-400 hover:text-green-300 rounded-lg hover:bg-green-400/10">
                      <Pencil className="w-4 h-4" />
                    </button> */}
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                      className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-400">
          Showing 1 to {entriesPerPage} of {getAllProducts.length} entries
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded">
            1
          </button>
          <button
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
            disabled={
              currentPage === Math.ceil(getAllProducts.length / entriesPerPage)
            }
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
