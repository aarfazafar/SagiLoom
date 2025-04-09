import React from "react";
import NavBar from "../NavBar/NavBar";
import bg1 from "../../assets/bg1.png";
import bg2 from "../../assets/bg2.png";
import bg4 from "../../assets/bg4.png";
import Carousal1 from "../Carousal/Carousal1";
import { Layout } from "../Layout/Layout";
import Loader from "../Loader/Loader";
import Hero from "../HeroSection/HeroSection";
import { useContext } from "react";
import myContext from "../../context/myContext";
import poster from "../../assets/@_sagiloom_.png";
import HeroSection from "../HeroSection/HeroSection2";
import Features from "../FeaturesSection/Features";
const foodData = [
  {
    name: "Authentic Bombay Mawa Jalebi",
    price: 120,
    tags: ["sweet", "jalebi", "Bombay special"],
    image:
      "https://media.assettype.com/knocksense%2Fimport%2F24928317%2Forigin.jpg?w=1200&auto=format%2Ccompress&fit=max",
  },
  // https://i.pinimg.com/736x/13/7e/20/137e204ddd138b462b25adc5f798bd06.jpg
  {
    name: "Malpua Rabdi",
    price: 150,
    tags: ["sweet", "dessert", "rabdi", "malpua"],
    image:
      "https://i.pinimg.com/736x/cd/ed/a2/cdeda25ec41f8528bfa3c6bd68d0d07f.jpg",
  },
  {
    name: "Gajar Halwa",
    price: 100,
    tags: ["sweet", "halwa", "carrot", "dessert"],
    image:
      "https://i.pinimg.com/736x/e4/e7/28/e4e72804c139864f64699664712f488a.jpg",
  },
  {
    name: "Gulab Jamun Rabdi",
    price: 130,
    tags: ["sweet", "gulab jamun", "rabdi", "dessert"],
    image:
      "https://i.pinimg.com/736x/bc/6a/3d/bc6a3dd542422659acf4ddd4cf6b01cc.jpg",
  },

  {
    name: "Dudhi Halwa",
    price: 110,
    tags: ["sweet", "halwa", "bottle gourd", "dessert"],
    image:
      "https://i.pinimg.com/736x/8a/ed/26/8aed26057f3a6989fb7d3ea2d151e968.jpg",
  },
  {
    name: "Kaju Katli",
    price: 180,
    tags: ["sweet", "cashew", "katli", "dessert"],
    image:
      "https://i.pinimg.com/236x/94/22/29/9422290c442e8323245746b30eaf1564.jpg",
  },
  {
    name: "Motichoor Laddu",
    price: 140,
    tags: ["sweet", "laddu", "motichoor", "dessert"],
    image:
      "https://i.pinimg.com/736x/b3/5c/f8/b35cf874fb4996bb970f86014e8c2625.jpg",
  },
  {
    name: "Punjabi Samosa",
    price: 50,
    tags: ["snack", "samosa", "Punjabi special", "vegetarian"],
    image:
      "https://i.pinimg.com/736x/c5/2f/0c/c52f0c83bc095d1b6814342a4122fe98.jpg",
  },
  {
    name: "Bombay Special Vada Pao",
    price: 60,
    tags: ["street food", "vada pao", "Bombay special", "vegetarian"],
    image:
      "https://i.pinimg.com/736x/df/66/b6/df66b65850687bcfce9471c2b66375b9.jpg",
  },
  {
    name: "JJ Special Haleem",
    price: 200,
    tags: ["non-vegetarian", "haleem", "JJ special", "meat"],
    image:
      "https://i.pinimg.com/736x/f6/31/91/f63191fa1c5c00aec3b9825559f842e2.jpg",
  },
  {
    name: "Dahi Puri",
    price: 80,
    tags: ["chaat", "street food", "vegetarian", "puri"],
    image:
      "https://i.pinimg.com/736x/69/6d/01/696d01e1564a8a489ff21c232a55adbc.jpg",
  },
  {
    name: "Sew Puri",
    price: 70,
    tags: ["chaat", "street food", "vegetarian", "puri"],
    image:
      "https://i.pinimg.com/736x/c4/8d/e0/c48de0cc613c41d18c30872875722ccc.jpg",
  },
  {
    name: "Papri Chaat",
    price: 90,
    tags: ["chaat", "street food", "vegetarian", "crispy"],
    image:
      "https://i.pinimg.com/236x/f0/dc/32/f0dc328ace44cb0bf91b1a65154ffc1d.jpg",
  },
];
const Home = () => {
  const context = useContext(myContext);
  const { getAllProducts } = context;
  return (
    <Layout>
      <div className="w-screen">
        <div className="w-full">
          <HeroSection />
          {/* <Hero /> */}
          <Carousal1 data={getAllProducts} />
          <div className="w-full min-h-screen">
            <Features />
          </div>
        </div>
        <div className="w-full">
          <img className="w-full" src={poster} alt="" />
        </div>
        {/* <Loader/> */}
      </div>
    </Layout>
  );
};

export default Home;
