import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebaseConfig";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Bestsellers = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch all bestsellers and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bestsellersSnapshot = await getDocs(
          collection(fireDB, "bestsellers")
        );
        const bestsellerList = bestsellersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBestsellers(bestsellerList);

        const productSnapshot = await getDocs(collection(fireDB, "products"));
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (err) {
        console.error("Error fetching data", err);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  // Delete bestseller relation (not the product)
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "bestsellers", id));
      toast.success("Bestseller removed!");
      setBestsellers((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error("Could not delete");
    }
  };

  const getProductInfo = (productId) => {
    return products.find((p) => p.id === productId);
  };

  const trimDescription = (text) => {
    const wordLimit = 4;
    const words = text?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  return (
    <div className="pl-16 pt-5 pr-8 pb-2 md:p-10 bg-[#1a1b23] min-h-screen">
      <h2 className="text-xl font-semibold text-white mb-6">Bestsellers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bestsellers.map((b) => {
          const product = getProductInfo(b.productId);
          return (
            <div>
              <div
                key={b.id}
                className="bg-[#2a2b37] p-4 rounded-lg transition-transform transform hover:scale-101 hover:bg-[#24252f] hover:shadow-xl cursor-pointer"
              >
                <Link to={`/productinfo/${product?.id}`}>
                  {/* <img
                    src={b.posterUrl}
                    alt="Bestseller Poster"
                    className="h-full w-full object-cover mb-4"
                  /> */}
                  <div className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer">
                    <img
                      src={b.posterUrl}
                      alt="Poster"
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                      <span className="text-white font-semibold text-lg bg-black bg-opacity-60 px-4 py-2 rounded-md">
                        View Product
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg text-white font-semibold">
                    {trimDescription(product?.name) || "Unknown Product"}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    ID: {product?.id}
                  </p>
                </Link>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="mt-2 px-4 py-1 text-sm bg-[#b31e1e] text-white rounded hover:bg-red-500 hover:scale-101"
                >
                  Remove from Bestsellers
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bestsellers;
