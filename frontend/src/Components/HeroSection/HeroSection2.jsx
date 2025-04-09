import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "../../constants/data";
import { Link } from "react-router-dom";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX - innerWidth / 2) / 50,
      y: (clientY - innerHeight / 2) / 50,
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            className="h-full w-full"
          >
            <div
              className="h-full w-full bg-cover object-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
                filter: "brightness(0.8)",
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <div key={currentSlide} className="text-center text-white z-10">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut",
              }}
              className="text-7xl font-bold mb-4"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: "easeOut",
              }}
              className="text-2xl"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <Link>
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.5,
                  delay: 0.7,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Shop Now
              </motion.button>
            </Link>
          </div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default HeroSection;
