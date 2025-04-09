import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useState, useEffect } from "react";
import Left from "../../assets/Left.png";
import Right from "../../assets/Right.png";

import bg1 from "../../assets/bg1.png";
import bg2 from "../../assets/bg2.png";
import bg4 from "../../assets/bg4.png";
import bg5 from "../../assets/bg5.png";
const images = [bg1, bg2, bg4, bg5];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      onNextClick();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <main className="w-full flex flex-col items-center justify-between lg:min-h-screen">
      <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
        <div className="relative w-full flex items-center overflow-hidden">
          {/* Left/right controls */}
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
                <button className="rounded-full border-1 border-gray-200 p-2 md:p-3 flex justify-center items-center" onClick={onPrevClick}>
                  <img className="w-3 h-3 md:h-5 md:w-5 invert" src={Left} alt="" />
                </button>
                <button className="rounded-full border-1 border-gray-200 p-2 md:p-3 flex justify-center items-center" onClick={onNextClick}>
                  <img className="w-3 h-3 md:h-5 md:w-5 invert" src={Right} alt="" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List of images with circular effect */}
          <motion.div
            className="flex flex-nowrap"
            animate={{ x: `-${current * 100}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
            onHoverStart={() => setIsFocus(true)}
            onHoverEnd={() => setIsFocus(false)}
            style={{ display: "flex", width: `${images.length * 100}%` }}
          >
            {[...images, images[0]].map((image, idx) => (
              <motion.img
                key={idx}
                src={image}
                alt={image}
                className="mt-16 md:m-0 w-full md:aspect-[16/9] object-cover flex-shrink-0 brightness-95"
              />
            ))}
          </motion.div>

          {/* Control pill */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex gap-2 px-2 py-1.5 md:gap-3 md:px-3 md:py-2 bg-gray-400 rounded-full opacity-80">
              {images.map((_, idx) => (
                <button key={idx} onClick={() => setCurrent(idx)}>
                  <div
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full backdrop-brightness-50 opacity-90 ${
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


// import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
// import { useState, useEffect } from "react";
// import Left from "../../assets/Left.png";
// import Right from "../../assets/Right.png";

// import bg1 from "../../assets/bg1.png";
// import bg2 from "../../assets/bg2.png";
// import bg4 from "../../assets/bg4.png";
// import bg5 from "../../assets/@_sagiloom_.png";

// const images = [bg1, bg2, bg4, bg5];

// export default function Hero() {
//   const [current, setCurrent] = useState(0);
//   const [isFocus, setIsFocus] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const onPrevClick = () => {
//     setCurrent((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const onNextClick = () => {
//     setCurrent((prev) => (prev + 1) % images.length);
//   };

//   return (
//     <main className="w-full flex flex-col items-center justify-between lg:min-h-screen">
//       <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
//         <div className="relative w-full flex items-center overflow-hidden">
//           {/* Left/right controls */}
//           <AnimatePresence>
//             {isFocus && (
//               <motion.div
//                 className="absolute left-4 right-6 flex justify-between z-10"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onHoverStart={() => setIsFocus(true)}
//                 onHoverEnd={() => setIsFocus(false)}
//               >
//                 <button className="rounded-full border-1 border-gray-200 p-2 md:p-3 flex justify-center items-center" onClick={onPrevClick}>
//                   <img className="w-3 h-3 md:h-5 md:w-5 invert" src={Left} alt="" />
//                 </button>
//                 <button className="rounded-full border-1 border-gray-200 p-2 md:p-3 flex justify-center items-center" onClick={onNextClick}>
//                   <img className="w-3 h-3 md:h-5 md:w-5 invert" src={Right} alt="" />
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* List of images with circular effect */}
//           <motion.div
//             className="flex flex-nowrap"
//             animate={{ x: `-${current * 100}%` }}
//             transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
//             onHoverStart={() => setIsFocus(true)}
//             onHoverEnd={() => setIsFocus(false)}
//             style={{ display: "flex", width: "300%" }}
//           >
//             {[...images, images[0]].map((image, idx) => (
//               <motion.img
//                 key={idx}
//                 src={image}
//                 alt={image}
//                 className="mt-16 md:m-0 w-full md:aspect-[16/9] object-cover flex-shrink-0 brightness-95"
//               />
//             ))}
//           </motion.div>

//           {/* Control pill */}
//           <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
//             <div className="flex gap-2 px-2 py-1.5 md:gap-3 md:px-3 md:py-2 bg-gray-400 rounded-full opacity-80">
//               {images.map((_, idx) => (
//                 <button key={idx} onClick={() => setCurrent(idx)}>
//                   <div
//                     className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full backdrop-brightness-50 opacity-90 ${
//                       idx === current ? "bg-white" : "bg-zinc-600"
//                     }`}
//                   ></div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </MotionConfig>
//     </main>
//   );
// }
