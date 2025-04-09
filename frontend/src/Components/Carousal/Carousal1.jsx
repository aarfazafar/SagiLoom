import React from "react";
import Slider from "react-slick";
import Product from "../Product/Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../index.css";

// Custom Arrow Components with full styling
const PrevArrow = ({ className, style, onClick }) => (
  <button
    type="button"
    className={`${className} slick-prev z-10 left-0 text-4xl text-[#3a2e23] hover:text-black transition-all`}
    style={{
      ...style,
      display: "block",
      background: "rgba(0,0,0,0.2)",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    }}
    onClick={onClick}
  >
    ←
  </button>
);

const NextArrow = ({ className, style, onClick }) => (
  <button
    type="button"
    className={`${className} slick-next z-10 right-0 text-4xl text-[#3a2e23] hover:text-black transition-all`}
    style={{
      ...style,
      display: "block",
      background: "rgba(0,0,0,0.2)",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    }}
    onClick={onClick}
  >
    →
  </button>
);

const Carousal1 = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    accessibility: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
      // style={{ backgroundImage: `url('../../assets/menubg.png')` }}
    >
      <div className="w-full min-h-screen flex flex-col items-center">
        {/* Heading Section */}
        <div className="w-full flex justify-center">
          <div className="w-full heading-font text-4xl bg-gradient-to-r from-[#e8d8c3]/20 via-[#e8d8c3]/70 to-[#e8d8c3]/20 tracking-wide text-center px-4 py-4 text-black/80">
            New Arrivals
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full py-4 min-h-[70vh] bg-[#fbf7f6] shadow-md backdrop-blur-lg">
          <div className="w-full relative px-8 md:px-15 py-2">
            <Slider {...settings}>
              {data.map((product, index) => (
                <Product product={product} key={product.id || index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousal1;
