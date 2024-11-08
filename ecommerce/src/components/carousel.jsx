import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import serviceConfig from '../services/config/servicesConfig';
import LoadGif from './LoadGif';

const Carousel = () => {
  const [counter, setCounter] = useState(0);
  const [sliderSections, setSliderSections] = useState([]);
  const sliderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const app = initializeApp(serviceConfig);
  const db = getFirestore(app);

  const fetchCarouselData = async () => {
    try {
      const collectionRef = collection(db, "dbCarrusel");
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const images = data.map(item => `/src/assets/img/${item.name}.jpeg`);
      setSliderSections(images);
    } catch (e) {
      console.error("Error al obtener datos de Firestore: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  useEffect(() => {
    if (sliderRef.current && sliderSections.length > 0) {
      const widthImg = 100 / sliderSections.length; 
      sliderRef.current.style.transform = `translateX(-${counter * widthImg}%)`;
      sliderRef.current.style.transition = 'transform ease .6s';
    }
  }, [counter, sliderSections]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % sliderSections.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderSections.length]);

  const moveToRight = () => {
    setCounter((prevCounter) => (prevCounter + 1) % sliderSections.length);
  };

  const moveToLeft = () => {
    setCounter((prevCounter) => (prevCounter - 1 + sliderSections.length) % sliderSections.length);
  };

  if (isLoading) {
    return <LoadGif/>; 
  }

  return (
    <div className="container-carousel">
      <div
        className="carruseles"
        ref={sliderRef}
        style={{ display: 'flex', width: `${sliderSections.length * 100}%` }}
        role="region"
        aria-label="Carrusel de imágenes"
      >
        {sliderSections.map((img, index) => (
          <section className="slider-section" key={index} style={{ width: `${100 / sliderSections.length}%` }}>
            <img
              src={img}
              alt={`Slide ${index}`}
              style={{ width: '100%', height: 'auto' }}
            />
          </section>
        ))}
      </div>
      <div className="btn-left" onClick={moveToLeft} aria-label="Mover a la izquierda">
        <FaChevronLeft className="icon-white" />
      </div>
      <div className="btn-right" onClick={moveToRight} aria-label="Mover a la derecha">
        <FaChevronRight className="icon-white" />
      </div>
    </div>
  );
};

export default Carousel;
