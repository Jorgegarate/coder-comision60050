import { useEffect, useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
function ProductPage(props) {

  return (
    <div className="container mx">
      <div className="row">
        <button className="d-flex">
          <p>boton 1</p>
          <IoChevronForwardOutline />
        </button>
        <button className="d-flex">
          <p>boton 2</p>
          <IoChevronForwardOutline />
        </button>
        <button className="d-flex">
          <p>boton 3</p>
          <IoChevronForwardOutline />
        </button>
      </div>
      <div className="row mt-6">
        <div className="col-12 col-sm-8 col-xl-7">
          <div className="">
              <ProductImage productId={2}/>
          </div>
        </div>
        <div className="col-12 col-sm-4 col-xl-5">
          <ProductDetails productId={2}/>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

