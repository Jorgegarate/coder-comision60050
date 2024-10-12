import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Header(img) {
  return (
   <header className="container-full d-flex content-space-between p-vertical ">
        <div className="img-div">
           <Link to={`/`}>
            <img src={img.logo} alt="logo" />
           </Link> 
        </div>
        <Navbar/>
   </header>
  );
}

export default Header;