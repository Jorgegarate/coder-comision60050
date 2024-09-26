import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";

const NavItem = ({ index, label, isActive, onClick, className }) => {
    const itemClass = `${isActive ? "active" : ""} ${className || ""}`.trim();

    return (
        <a
            className={itemClass}
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

const NavList = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNavClick = (index) => {
        setActiveIndex(index); // Actualizar el índice activo
    };

    return (
        <div className="d-flex justify-content-align-items-center w-100">
            <div className="d-flex w-100 justify-content-center">
                {["Botón 1", "Botón 2", "Botón 3", "Botón 4"].map((label, index) => (
                    <NavItem
                        className="mr d-sm-none d-block"
                        key={index}
                        index={index}
                        label={label}
                        isActive={activeIndex === index} // Verifica si este elemento es activo
                        onClick={handleNavClick}
                    />
                ))}
            </div>
            <a className="d-none d-sm-block">
                <IoMenuOutline className="menu-icon mr" />
            </a>
        </div>
    );
};

export default NavList;
