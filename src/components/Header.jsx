import Navbar from "./NavBar.jsx";
import IconsNavbar from "./IconsNavbar.jsx";
function Header(props) {
    return (
        <header className="header">
            <div className="container">
                <div>
                    <img src={props.logo} className="" alt="logo" />
                    <h1>Tiendas</h1>
                </div>
                <Navbar />
                <IconsNavbar />
            </div>

        </header>
    );
}
export default Header