import React from "react";
import Slider from "react-slick";
import Product from "../Product/Product";
import { useDragControls } from "motion/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../index.css'
const Carousal = ({ data }) => {
  const controls = useDragControls();
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    arrows: true,
    accessibility: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      id="menu"
      className="min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url('../../assets/menubg.png')` }}
    >
      <div className="w-full min-h-screen flex flex-col">
        {/* Heading Section */}
        <div className="w-full flex justify-center my-2">
          <div className="w-full heading-font text-4xl bg-gradient-to-r from-[#e8d8c3]/20 via-[#e8d8c3]/70 to-[#e8d8c3]/20 tracking-wide text-center px-4 py-2 text-black/80">New Arrivals</div>
        </div>

        {/*Carousel */}
        <div
          className="w-full py-4 min-h-[70vh] bg-[#fbf7f6] shadow-md backdrop-blur-lg"
          drag
          dragControls={controls}
        >
          {/* <MenuCarousal data={foodData} /> */}

          <div className="w-full relative px-10 py-2">
            <Slider
              {...settings}
              onPointerDown={(event) => controls.start(event)}
            >
              {data.map((product, index) => {
                return <Product product={product} key={index} />;
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousal;
