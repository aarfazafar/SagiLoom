import video from "../../assets/videos/about-video.mp4";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { FaLeaf, FaAward, FaHeart, FaShieldAlt, FaStar } from "react-icons/fa";
import {
  Leaf,
  Gem,
  Ruler,
  Hourglass,
  Trophy,
  Heart,
  Shield,
  Star,
  Sparkles,
  Truck,
  Clock,
} from "lucide-react";
const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description:
      "Each piece is crafted with exceptional attention to detail using the finest materials available.",
  },
  {
    icon: Ruler,
    title: "Perfect Fit & Finish",
    description:
      "Every item in our collection is designed for modern men’s and women’s who appreciate precision and style.",
  },
  {
    icon: Gem,
    title: "Wearable Luxury",
    description:
      "We deliver High-end fashion that’s not just stylish but also comfortable for everyday wear.",
  },
  {
    icon: Hourglass,
    title: "Timeless Fashion",
    description:
      "We produce pieces that never go out of style, blending heritage with contemporary trends.",
  },
  {
    icon: Leaf,
    title: "Sustainable & Ethical",
    description:
      "We are committed to responsible fashion, ensuring fair practices and eco-conscious production.",
  },
];

const AboutFeatures = () => {
  // const features = [
  //   {
  //     title: "Brand Story",
  //     description:
  //       "Crafting excellence since 1990, our journey began with a vision to revolutionize the industry through innovation and quality.",
  //     icon: <Leaf size={32} color="#4CAF50" />,
  //   },
  //   {
  //     title: "Product Quality",
  //     description:
  //       "Every product undergoes rigorous quality testing, ensuring only the finest materials and craftsmanship reach our customers.",
  //     icon: <Trophy size={32} color="#FFD700" />,
  //   },
  //   {
  //     title: "Unique Value",
  //     description:
  //       "Our proprietary technology and customer-first approach set us apart, delivering unmatched value and satisfaction.",
  //     icon: <Heart size={32} color="#E91E63" />,
  //   },
  //   {
  //     title: "Customer Promise",
  //     description:
  //       "We stand behind every product with our lifetime guarantee, providing peace of mind and unwavering support.",
  //     icon: <Shield size={32} color="#2196F3" />,
  //   },
  //   {
  //     title: "Sustainability",
  //     description:
  //       "Committed to environmental stewardship, we implement eco-friendly practices throughout our production process.",
  //     // icon: <FaLeaf className="text-4xl text-emerald-500" />
  //     icon: <Star size={32} color="#FFC107" />,
  //   },
  // ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-10 lg:py-8 h-auto">
        <div className="flex flex-col lg:flex-row  gap-8 lg:gap-16 h-auto">
          {/* Video Section */}
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <video
                className="sticky top-0 w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Brand showcase video"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Features Section */}
          <div className="">
            <div className="relative lg:h-[1200px] px-8 md:px-16 overflow-visible">
              <div className="sticky top-5 z-10 bg-white/80 mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gray-50 p-2">Why Choose Us ?</h2>
              </div>

              <div className="space-y-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="p-8 flex items-center gap-8 bg-gray-50 rounded-2xl shadow-sm"
                  >
                    <feature.icon className="w-12 h-12 mb-4 text-black/80" />
                    <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 tracking-wide">{feature.description}</p>

                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFeatures;
