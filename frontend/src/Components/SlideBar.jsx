import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "green",
        width: "80px", // Increased width
        height: "80px", // Increased height
        borderRadius: "50%",
        right: "-90px", // Adjust position
        zIndex: 10,
        cursor: "pointer",
        padding: "20px",
        transition: "0.3s ease-in-out",
      }}
      onClick={onClick}
    >
      {/* <FaArrowRight size={50} color="white" /> Increased icon size */}
    </div>
  );
}


function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "green",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        left: "-90px",
        zIndex: 10,
        cursor: "pointer",
        padding: "20px",
        transition: "0.3s ease-in-out",
      }}
      onClick={onClick}
    >
      {/* <FaArrowLeft size={50} color="white" /> Increased icon size */}
    </div>
  );
}


const SlideBar = () => {
  const messages = [
    {
      id: 1,
      image: "img/product-1.png",
      name: "Organic Vegetable",
      price: "$19.00",
    },
    {
      id: 2,
      image: "img/product-2.png",
      name: "Organic Vegetable",
      price: "$19.00",
    },
    {
      id: 3,
      image: "img/product-1.png",
      name: "Organic Vegetable",
      price: "$19.00",
    },
    {
      id: 4,
      image: "img/product-2.png",
      name: "Organic Vegetable",
      price: "$19.00",
    },
    {
      id: 5,
      image: "img/product-1.png",
      name: "Organic Vegetable",
      price: "$19.00",
    },
  ]; 
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

  return (
    <>
      <div className="m-auto">
        <div className="mt-20">
          <Slider {...settings}>
            {messages.map((item, index) => (
              <div className="pb-5">
                <div className="product-item position-relative shadow-2xl m-3 rounded-2xl d-flex flex-column text-center">
                  <img className="img-fluid mb-4" src={item.image} alt />
                  <h6 className="mb-3">{item.name}</h6>
                  <h5 className="text-primary mb-0">{item.price}</h5>
                  <div className="btn-action d-flex justify-content-center">
                    <a className="btn bg-primary py-2 px-3" href>
                      <i className="bi bi-cart text-white" />
                    </a>
                    <a className="btn bg-secondary py-2 px-3" href>
                      <i className="bi bi-eye text-white" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default SlideBar;
