import { useState } from "react";
import CartWidget from "./CartWidget";
import WishList from "./Wishlist";
import NavList from "./NavList";

const NavBar = () => {
    return (
        <nav className="d-flex w-100 justify-content-space-between">
            <NavList />
            <div className="d-flex justify-content-align-items-center">
            <WishList />
            <CartWidget />
            </div>
            
        </nav>
    );
};

export default NavBar;
