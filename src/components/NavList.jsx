import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";

const NavItem = ({ index, label, isActive, onClick, className }) => {
    // Construir la clase CSS combinada
    const itemClass = `${isActive ? "active" : ""} ${className || ""}`.trim();

    return (
        <a
            className={itemClass}  // Usar la clase combinada
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick(index);
            }}
        >
            {label}
        </a>
    );
};


const NavList  = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNavClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="d-flex justify-content-align-items-center w-100">
            <div className="d-flex w-100 justify-content-center">
            {["Botón 1", "Botón 2", "Botón 3", "Botón 4"].map((label, index) => (
                <NavItem
                    className="mr"
                    key={index}
                    index={index}
                    label={label}
                    isActive={activeIndex === index}
                    onClick={handleNavClick}
                />
            ))}
            </div>
            <a>
                <IoMenuOutline className="menu-icon mr" />
            </a>
        </div>
    );
};

export default NavList ;