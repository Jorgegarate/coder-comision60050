import Navbar from "./NavBar.jsx";
import IconsNavbar from "./IconsNavbar.jsx";
function Header(props) {
    return (
        <header className="">
            <div className="container-full d-flex justify-content-space-between m-vertical ">
                <div>
                    <img src={props.logo} className="" alt="logo" />
                </div>
                <Navbar />
            </div>

        </header>
    );
}
export default Header