import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "../Loader/Loading";
const SearchBar = ({ data }) => {
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const [filterSearchData, setFilterSearchData] = useState(null);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getSearchData = () => {
    if (!Array.isArray(data)) return;

    const FilterData = data
      .filter((product) => {
        const query = search.toLowerCase();

        // Helper to extract value from an array of objects
        const getValue = (arr, key) =>
          arr.find((obj) => obj[key])?.[key]?.toLowerCase() || "";

        return (
          product.name?.toLowerCase().includes(query) ||
          getValue(product.specification, "Color").includes(query) ||
          getValue(product.specification, "Fabric").includes(query) ||
          getValue(product.specification, "Pattern").includes(query) ||
          getValue(product.productCategories, "OCCASION").includes(query) ||
          getValue(product.productCategories, "CATEGORY").includes(query) ||
          getValue(product.productCategories, "COLLECTION").includes(query)
        );
      })
      .slice(0, 8);

    setFilterSearchData(FilterData);
    // console.log("Filtered Results →", FilterData);
  };

  useEffect(() => {
    if (search.length >= 3 && Array.isArray(data)) {
      getSearchData();
    } else {
      setFilterSearchData([]);
    }
  }, [search, data]);

  const trimDescription = (text, type) => {
    // const wordLimit = type === "title" ? 4 : 6;
    const wordLimit =  10;
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  return (
    <div className="relative z-50 w-full flex flex-col items-center">
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Search for luxury, fit, style..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/80 shadow-md bg-white placeholder-gray-400 text-gray-800 transition-all duration-200"
        />
        <Search className="absolute top-3.5 left-3 text-gray-500" size={20} />
      </div>

      {/* Animated Drop-down */}
      <AnimatePresence>
        {search.length >= 3 &&
          (!data ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-full mt-2 w-full max-w-xl bg-white shadow-xl rounded-2xl py-6 px-4 border border-gray-200"
            >
              <Loading />
            </motion.div>
          ) : (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full mt-2 w-full max-w-xl bg-white shadow-xl rounded-2xl py-2 px-4 border border-gray-200 max-h-96 overflow-y-auto"
            >
              {filterSearchData.length > 0 ? (
                filterSearchData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-3 px-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-all"
                    onClick={() => navigate(`/productinfo/${item.id}`)}
                  >
                    <img
                      src={item.productImages[0]}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="text-sm font-medium text-gray-700">
                      {item.name}
                      <p className="text-xs text-gray-500">
                        {trimDescription(item.description)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center py-6">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                    alt="no results"
                    className="w-16 opacity-70"
                  />
                </div>
              )}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
