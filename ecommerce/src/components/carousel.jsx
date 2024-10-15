import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { dbCarrusel } from '../data/DbCarrusel';

const Carousel = () => {
  const [counter, setCounter] = useState(0);
  const sliderRef = useRef(null);

  const sliderSections = dbCarrusel.map((item) => `../src/img/${item.name}.jpeg`);

  const widthImg = 100 / sliderSections.length;

  const moveToRight = () => {
    setCounter((prevCounter) => (prevCounter + 1) % sliderSections.length);
  };

  const moveToLeft = () => {
    setCounter((prevCounter) => (prevCounter - 1 + sliderSections.length) % sliderSections.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${counter * widthImg}%)`;
      sliderRef.current.style.transition = 'transform ease .6s';
    }
  }, [counter, widthImg]);

  useEffect(() => {
    const interval = setInterval(moveToRight, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-carousel">
      <div className="carruseles" ref={sliderRef} style={{ display: 'flex', width: `${sliderSections.length * 100}%` }}>
        {sliderSections.map((img, index) => (
          <section className="slider-section" key={index} style={{ width: `${widthImg}%` }}>
            <img src={img} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
          </section>
        ))}
      </div>
      <div className="btn-left" onClick={moveToLeft}>
        <FaChevronLeft className="icon-white" />
      </div>
      <div className="btn-right" onClick={moveToRight}>
        <FaChevronRight className="icon-white" />
      </div>
    </div>
  );
};

export default Carousel;
