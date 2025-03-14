import React from "react";
import "tailwindcss";
import SlideBar from "./SlideBar";

const Product = () => {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="mx-auto text-center mb-5" style={{ maxWidth: 500 }}>
            <h6 className="text-primary text-uppercase">Products</h6>
            <h1 className="display-5">Our Fresh &amp; Organic Products</h1>
          </div>

          <SlideBar></SlideBar>


        </div>
      </div>
    </>
  );
};

export default Product;
