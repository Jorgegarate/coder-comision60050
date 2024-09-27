import Navbar from "./Navbar";

function Header(img) {
  return (
   <header className="container-full d-flex content-space-between p-vertical ">
        <div className="img-div">
            <img src={img.logo} alt="logo" />
        </div>
        <Navbar/>
   </header>
  );
}

export default Header;