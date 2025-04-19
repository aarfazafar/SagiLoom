import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, Pause, Heading, Shield, Clock, Leaf, Heart } from "lucide-react";
import videosrc from "../../assets/videos/SM2002.mp4";
import bg1 from "../../assets/bg1.png";
import bg2 from "../../assets/bg2.png";
import { Layout } from "../Layout/Layout";
import AboutFeatures from "../FeaturesSection/Features";
import why from "../../assets/why.png";
import bg from "../../assets/about-bg.png";
import { Link } from "react-router-dom";
function FadeInSection({ children, delay = 0 }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

const VideoHero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative h-[90vh] overflow-hidden group">
      {/* Video */}
      <video
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={videoRef}
        src={videosrc}
        autoPlay
        muted
        loop
        playsInline
        className={`h-full object-cover object-top transition duration-300 w-full lg:w-[30vw]  ${
          isHovered ? "brightness-60" : "brightness-100"
        }`}
      />

      {/* Central Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   bg-white/20 p-6 rounded-full shadow-xl hover:scale-105 transition-all"
      >
        {isPlaying ? (
          <Pause size={32} className="text-white/70 " />
        ) : (
          <Play size={32} className="text-white/70 " />
        )}
      </button>
    </div>
  );
};

function About() {
  return (
    <Layout className="bg-white">
      <div className="absolute top-0 bg-gradient-to-r from-[#e8d8c3]/20 via-[#e8d8c3] to-[#e1cbc1] w-full h-16 z-50"></div>

      {/* Brand Introduction */}
      <section className="relative py-25 md:py-17 px-10 flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-br from-[#ffecd2] via-[#fcb69f]/10 to-[#ff9a9e]/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden rounded-3xl">
        {/* Overlay behind content */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0" />

        {/* Content with z-10 to sit above the overlay */}
        <FadeInSection>
          <div className="relative z-10 w-full h-full flex items-center shadow-lg min-h-80 px-4 bg-gradient-to-br from-[#ffecd2] via-[#fcb69f]/10 to-[#ff9a9e]/10">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#362a21] drop-shadow text-shadow-lg">
                Welcome to SAGILoom
              </h2>
              <p className="text-lg text-[#7b6653] max-w-3xl mx-auto leading-relaxed">
                More than just a fashion brand—we're a movement that redefines
                style for both men and women. With a perfect fusion of tradition
                and modernity, our designs celebrate individuality, confidence,
                and sophistication.
              </p>
            </div>
          </div>
        </FadeInSection>

        <div className="relative z-10">
          <VideoHero />
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="relative">
                <img
                  src={bg1}
                  alt="Fashion Design Process"
                  className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-cream p-4 rounded-lg shadow-xl"
                >
                  <Heading className="w-8 h-8 text-gray-800" />
                </motion.div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                  Our Story
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Born from a passion for timeless craftsmanship and
                  contemporary design, SAGILoom was created to elevate fashion
                  beyond trends. We believe in designing pieces that exude
                  elegance, whether it's a sharp, tailored suit for men or a
                  graceful yet powerful ensemble for women.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our journey is about blending heritage with innovation,
                  ensuring that every creation is a masterpiece of style and
                  precision.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 px-4 md:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                Our Promise
              </h2>
              <p className="text-xl text-gray-600">
                Committed to excellence in every detail
              </p>
            </div>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Uncompromising Quality",
                  description:
                    "Every product undergoes rigorous quality checks to ensure a flawless experience.",
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "Timeless Design",
                  description:
                    "Crafted to transcend seasonal trends and remain stylish for years to come.",
                },
                {
                  icon: <Leaf className="w-6 h-6" />,
                  title: "Sustainable & Ethical",
                  description:
                    "Committed to responsible fashion, ensuring fair practices and eco-conscious production.",
                },
              ].map((promise, index) => (
                <FadeInSection key={index} delay={index * 0.2}>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-3 bg-white rounded-lg shadow-md text-gray-800">
                      {promise.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {promise.title}
                      </h3>
                      <p className="text-gray-600">{promise.description}</p>
                    </div>
                  </motion.div>
                </FadeInSection>
              ))}
            </div>
            <FadeInSection delay={0.4}>
              <div className="relative">
                <img
                  src={bg2}
                  alt="Fashion Atelier"
                  className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-xl"
                >
                  <Heart className="w-8 h-8 text-gray-800" />
                </motion.div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* <section>
        <AboutFeatures/>
      </section> */}
      <section>
        <img
          src={why}
          className="w-full h-full object-cover brightness-95 opacity-90"
          alt=""
        />
      </section>
      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-tl from-[#ffecd2] via-[#fcb69f]/10 to-[#ff9a9e]/10">
        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
              Join the SAGILoom Movement
            </h2>
            <p className="text-xl mb-12 text-gray-600">
              Step into the world of SAGILoom—where fashion meets excellence,
              and every piece tells a story of sophistication.
            </p>
            <Link to={"/productpage"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cream text-gray-800 px-8 py-4 rounded-full text-lg font-semibold 
                         shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                Explore Our Collections
              </motion.button>
            </Link>
          </div>
        </FadeInSection>
      </section>
    </Layout>
  );
}

export default About;
