import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rArrow from '../../assets/arrow-right.png'
import lArrow from '../../assets/arrow-left.png'
import Product from "../Product/Product";
const Carousal = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    arrows: true,
    accessibility: false,
    responsive: [
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
          slidesToShow: 1,
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
      className="min-h-screen flex justify-center items-center bg-black bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('../../assets/menubg.png')` }}
    >
      <div className="w-full min-h-screen flex flex-col">
        {/* Heading Section */}
        <div className="w-full h-[15vh] flex justify-center items-center my-2">
          <img
            src={lArrow}
            alt=""
            className="w-40 brightness-150 mt-2"
          />
          <div className="text-4xl font-semibold text-crimson mt-7">Menu</div>
          <img src={rArrow} alt="" className="w-40 brightness-150" />
        </div>

        {/* Food Carousel */}
        <div className="w-full min-h-[70vh] bg-[#191919] opacity-98">
          {/* <MenuCarousal data={foodData} /> */}



          <div className="w-full overflow-hidden px-10">
            <Slider {...settings}>
              {data.map((product, index) => {
                return (
                  <Product product = {product} key = {index}/>
                );
              })}
            </Slider>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Carousal;
