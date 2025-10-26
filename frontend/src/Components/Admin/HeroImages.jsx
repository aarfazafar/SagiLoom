import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebaseConfig";
import toast from "react-hot-toast";
import AddHeroImageModal from "./AddHeroImageModal";
import { Plus } from "lucide-react";

const HeroImages = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch hero images
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, "heroImages"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHeroImages(list);
      } catch (err) {
        console.error("Error fetching hero images:", err);
        toast.error("Failed to load hero images");
      }
    };
    fetchHeroImages();
  }, []);

  // Delete hero image
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "heroImages", id));
      setHeroImages((prev) => prev.filter((img) => img.id !== id));
      toast.success("Hero image deleted!");
    } catch (err) {
      console.error("Failed to delete hero image:", err);
      toast.error("Could not delete hero image");
    }
  };

  return (
    <div className="pl-16 pt-5 pr-8 pb-2 md:p-10 bg-[#1a1b23] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Hero Posters</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="h-5 w-5" />
          Add Hero Image
        </button>
      </div>

      {heroImages.length === 0 ? (
        <p className="text-gray-400">No hero images yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {heroImages.map((hero) => (
            <div
              key={hero.id}
              className="bg-[#2a2b37] p-4 rounded-lg hover:bg-[#24252f] hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <div className="relative group overflow-hidden rounded-lg shadow-md">
                <img
                  src={hero.imageUrl}
                  alt="Hero"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-3">
                <h3 className="text-lg font-semibold text-white">{hero.title || "Untitled"}</h3>
                <p className="text-gray-400 text-sm">{hero.subtitle || "no subtitle"}</p>
              </div>

              <button
                onClick={() => handleDelete(hero.id)}
                className="mt-3 w-fit px-4 py-2 text-sm bg-red-800 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <AddHeroImageModal
          onClose={() => setIsModalOpen(false)}
          onImageAdded={(newImage) => setHeroImages((prev) => [...prev, newImage])}
        />
      )}
    </div>
  );
};

export default HeroImages;
