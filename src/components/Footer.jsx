
import Navbar from "./NavBar";
function Footer(props) {
    return (
        <footer>
            <img src={props.logo} className="" alt="logo" />
            <Navbar />
        </footer>
    );

}
export default Footer