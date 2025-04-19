import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  arrayRemove,
  doc,
  updateDoc
} from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebaseConfig";
import { toast } from "react-hot-toast";
import Product from "../Product/Product";
import { Layout } from "../Layout/Layout";
import { Loading } from "../Loader/Loading";
import { X } from "lucide-react";
const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [noUser, setNoUser] = useState(false);
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const savedUser = JSON.parse(localStorage.getItem("users"));
      if (!savedUser || !savedUser.uid) {
        setNoUser(true);
        return;
      }

      // Get user document by UID
      const userQuery = query(
        collection(fireDB, "user"),
        where("uid", "==", savedUser.uid)
      );
      const userSnapshot = await getDocs(userQuery);
      if (userSnapshot.empty) return toast.error("User data not found");

      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      const wishlist = userData.wishlist || [];

      if (wishlist.length === 0) {
        setWishlistProducts([]);
        setLoading(false);
        return;
      }

      // Fetch all products
      const productsRef = collection(fireDB, "products");
      const productSnapshot = await getDocs(productsRef);

      // Filter locally using doc.id
      const products = productSnapshot.docs
        .filter((doc) => wishlist.includes(doc.id))
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setWishlistProducts(products);

      setWishlistProducts(products);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productIdToRemove) => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("users"));
      if (!savedUser || !savedUser.uid)
        return toast.error("User not logged in");

      // Query user doc by UID
      const userQuery = query(
        collection(fireDB, "user"),
        where("uid", "==", savedUser.uid)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) return toast.error("User not found");

      const userDoc = userSnapshot.docs[0];
      const userRef = doc(fireDB, "user", userDoc.id);

      await updateDoc(userRef, {
        wishlist: arrayRemove(productIdToRemove),
      });

      setWishlistProducts((prev) =>
        prev.filter((p) => p.id !== productIdToRemove)
      );

      toast.success("Removed from wishlist!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <Layout>
      <div className="absolute top-0 bg-gradient-to-r from-[#e8d8c3]/20 via-[#e8d8c3] to-[#e1cbc1] w-full h-16"></div>

      <div className="w-full h-full bg-gradient-to-br from-[#ffecd2] via-[#fcb69f]/10 to-[#ff9a9e]/10">
        <div className="p-6 max-w-screen-xl mx-auto ">
          <h1 className="mt-15 text-3xl playfair-display tracking-wide text-amber-900 font-semibold mb-6 text-center">
            <p className="mt-15 shadow-md pb-3 rounded-t-lg">Your Wishlist</p>
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-60">
              <Loading />
            </div>
          ) : noUser ? (
            <div className="text-center text-gray-500 h-[70vh] flex flex-col justify-center items-center">
              <p className="text-2xl">You are not Signed In</p>
              <p className="text-sm mt-2">
                Sign in or Register to start adding your favorite products!
              </p>
            </div>
          ) : wishlistProducts.length === 0 ? (
            <div className="text-center text-gray-500 h-[70vh] flex flex-col justify-center items-center">
              <p className="text-2xl">Your wishlist is empty </p>
              <p className="text-sm mt-2">
                Start adding your favorite products!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {wishlistProducts.map((product, index) => (
                <div key={product.id || index} className="relative">
                  <Product product={product} />

                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-0 right-20 bg-pink-100 hover:bg-pink-200 text-gray-700 hover:scale-1.1 px-1 py-1 rounded text-xs shadow-md font-semibold transition-all duration-200"
                  >
                    <X></X>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
