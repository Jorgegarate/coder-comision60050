import React from "react";
import { NavLink } from "react-router-dom";

function NavLinkList({ links, onClick }) {
  return (
    <div className="d-flex flex-column content-space-center navbar-font">
      {links.map((link) => (
        <NavLink
          key={link.id}
          to={`/category/${link.id}`}
          className={({ isActive }) => 
            `mt-md mr-md ${isActive ? 'active' : ''}`
          }
          onClick={() => onClick(link.id)}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}

export default NavLinkList;
