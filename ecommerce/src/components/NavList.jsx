import React, { useState, useEffect, useRef } from "react";
import { IoMenuOutline, IoCloseSharp } from "react-icons/io5";
import { RiFacebookFill } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io5";
import { dbNameCategory } from "../data/DbNameCategory";
import { NavLink, useNavigate } from "react-router-dom";

function NavList() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttons, setButtons] = useState([]);
  const navList = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setButtons(dbNameCategory);
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
        <div className="d-flex flex-column content-space-center navbar-font">
          {buttons.map((button) => (
            <NavLink
              key={button.id}
              to={`/category/${button.id}`}
              className="mt-md mr-md"
              onClick={() => handleCategoryClick(button.id)}
              activeClassName="active"
            >
              {button.name}
            </NavLink>
          ))}
        </div>
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
