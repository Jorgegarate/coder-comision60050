import CartWidget from "./CartWidget"
import NavList from "./NavList"
import WishList from "./WishList"

function Navbar() {
  return (
    <nav className="d-flex w-md-100 content-space-between content-align-items-center flex-sm-direction">
       <NavList/>
       <div className="d-flex content-align-items-center">
        <WishList/>
        <CartWidget/>
       </div>

    </nav>
  )
}

export default Navbar