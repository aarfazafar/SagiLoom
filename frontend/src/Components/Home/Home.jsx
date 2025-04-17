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
import Carousal2 from "../Carousal/Carousal2";

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
          <Carousal2 />
          <div className="w-full min-h-screen">
            <Features />
          </div>
        </div>
        <div className="w-full brightness-85">
          <img className="w-full" src={poster} alt="" />
        </div>
        {/* <Loader/> */}
      </div>
    </Layout>
  );
};

export default Home;
