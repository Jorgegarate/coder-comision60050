import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import CartDetails from "../components/CartDetails";

function Header(img) {
  return (
   <header className="container-full d-flex content-space-between p-vertical ">
        <div className="img-div">
           <Link to={`/`}>
            <img className="mx my"src={img.logo} alt="logo" />
           </Link> 
        </div>
        <Navbar/>
        
   </header>
  );
}

export default Header;