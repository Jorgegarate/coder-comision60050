import React, { useState, useEffect, useRef } from "react";
import { IoMenuOutline, IoCloseSharp } from "react-icons/io5";
import { RiFacebookFill } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import NavLinkList from "./NavLinkList";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import serviceConfig from '../services/config/servicesConfig';

function NavList() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttons, setButtons] = useState([]);
  const navList = useRef(null);
  const navigate = useNavigate();

  const app = initializeApp(serviceConfig);
  const db = getFirestore(app);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const fetchCategories = async () => {
    try {
      const collectionRef = collection(db, "dbNameCategory");
      const querySnapshot = await getDocs(collectionRef);
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.data().id,
        name: doc.data().name
      }));
      setButtons(categoriesData);
    } catch (e) {
      console.error("Error al obtener categorías de Firestore: ", e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    closeSidebar();
  };

  useEffect(() => {
    if (navList.current) {
      if (isOpen) {
        navList.current.classList.add("active");
      } else {
        navList.current.classList.remove("active");
      }
    }
  }, [isOpen]);

  return (
    <div className="d-flex w-md-100 content-space-center content-align-items-center">
      <div
        className={`black-veil ${isOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>

      <div ref={navList} className="position-sm-absolute nav-sm-background d-flex flex-column content-space-between p-xy-sm">
        <a className="d-sm-block d-none" onClick={closeSidebar}>
          <IoCloseSharp className="icon" />
        </a>
        <NavLinkList links={buttons} onClick={handleCategoryClick} />
        <div className="d-flex d-sm-block d-none">
          <RiFacebookFill className="icon" />
          <IoLogoInstagram className="icon" />
        </div>
      </div>
      <a className="d-none d-sm-block" href="#" onClick={toggleMenu}>
        <IoMenuOutline className="icon-main" />
      </a>
    </div>
  );
}

export default NavList;
