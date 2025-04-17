import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Left from "../../assets/Left.png";
import Right from "../../assets/Right.png";

// import bg1 from "../../assets/bg8.png";
// import bg2 from "../../assets/bg9.png";
// import bg3 from "../../assets/bg4.png";
// import bg4 from "../../assets/bg10.png";
// // import bg7 from "../../assets/bg7.png"
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// // 🔥 Add/remove trending images here easily
// const images = [bg1, bg2, bg3, bg4];
import { getDocs, collection } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebaseConfig";

export default function Carousal2() {
  const [current, setCurrent] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, "bestsellers"));
        const posters = snapshot.docs
          .map((doc) => ({
            posterUrl: doc.data().posterUrl,
            productId: doc.data().productId,
          }))
          .filter((p) => p.posterUrl && p.productId);
        setImages(posters);

        // const posters = snapshot.docs
        //   .map((doc) => doc.data().posterUrl)
        //   .filter(Boolean);
        // setImages(posters);
      } catch (err) {
        console.error("Error fetching bestsellers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  useEffect(() => {
    if (current >= images.length) {
      setCurrent(0);
    }
  }, [images]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     onNextClick();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % (images.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const onPrevClick = () => {
    if (!transitioning) {
      setTransitioning(true);
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
      setTimeout(() => setTransitioning(false), 700);
    }
  };

  const onNextClick = () => {
    if (!transitioning) {
      setTransitioning(true);
      setCurrent((prev) => (prev + 1) % images.length);
      setTimeout(() => setTransitioning(false), 700);
    }
  };
  // const slideWidth = images.length > 0 ? 100 / images.length : 100;
  // const offset = current * slideWidth;

  if (loading || images.length === 0) {
    return (
      <main className="w-full flex flex-col items-center justify-center py-6">
        <div className="w-full max-w-6xl px-4">
          <div className="h-12 bg-gray-300 rounded-lg animate-pulse mb-4 w-1/3"></div>
          <div className="relative w-full overflow-hidden rounded-xl aspect-[16/9]">
            <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl"></div>
          </div>
        </div>
      </main>
    );
  }

  const offset = current * 100;

  return (
    <main className="w-full flex flex-col items-center justify-between">
      <div className="w-full flex justify-center">
        <div className="relative w-full playfair-display font-bold text-4xl bg-gradient-to-r from-[#e8d8c3]/20 via-[#e8d8c3]/70 to-[#e8d8c3]/20 tracking-wide text-center px-4 py-4 text-amber-950/90 text-shadow-lg">
          BestSellers
          <Link to={"/productpage/shop/trending"}>
            <ArrowRight className="absolute top-1/3 right-10" />
          </Link>
        </div>
      </div>
      <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
        <div className="relative w-full flex items-center overflow-hidden rounded-xl">
          {/* Controls */}
          <AnimatePresence>
            {isFocus && (
              <motion.div
                className="absolute left-4 right-6 flex justify-between z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onHoverStart={() => setIsFocus(true)}
                onHoverEnd={() => setIsFocus(false)}
              >
                <button
                  className="rounded-full border-1 border-gray-200 p-2 md:p-3 flex justify-center items-center"
                  onClick={onPrevClick}
                >
                  <img
                    className="w-3 h-3 md:h-5 md:w-5 invert"
                    src={Left}
                    alt=""
                  />
                </button>
                <button
                  className="rounded-full border-1 border-gray-200 p-2 md:p-3 flex justify-center items-center"
                  onClick={onNextClick}
                >
                  <img
                    className="w-3 h-3 md:h-5 md:w-5 invert"
                    src={Right}
                    alt=""
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Slides */}
          <motion.div
            className="flex flex-nowrap"
            // animate={{ x: `-${(current || 0) * 100}%` }}
            animate={{ x: `-${offset}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
            onHoverStart={() => setIsFocus(true)}
            onHoverEnd={() => setIsFocus(false)}
            style={{ width: `${images.length * 100}%` }}
          >
            {images.map(({ posterUrl, productId }, idx) => (
              <motion.div
                key={idx}
                className="w-full aspect-[16/9] flex-shrink-0 relative"
              >
                <img
                  src={posterUrl}
                  alt={`Slide ${idx}`}
                  className="w-full h-full object-cover brightness-95"
                />

                {/* View Product Box */}
                <Link
                  to={`/productinfo/${productId}`}
                  className="absolute bottom-5 right-5 lg:right-10 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
                >
                  View Product
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Pills */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex gap-2 px-3 py-2 bg-gray-400 rounded-full opacity-80">
              {images.map((_, idx) => (
                <button key={idx} onClick={() => setCurrent(idx)}>
                  <div
                    className={`w-2 h-2 rounded-full transition ${
                      idx === current ? "bg-white" : "bg-zinc-600"
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </MotionConfig>
    </main>
  );
}
