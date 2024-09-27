import { IoMenuOutline } from "react-icons/io5";


function NavList() {
  return (
    <div className="d-flex w-md-100 content-space-center content-align-items-center">
        <div className="black-veil">

        </div>
        <div className="position-sm-absolute nav-sm-background">
            <div className="">
                <a className="mr" href="">boton1</a>
                <a className="mr" href="">boton2</a>
                <a className="mr" href="">boton3</a>
                <a className="mr" href="">boton4</a>
            </div>

        </div>
        <a className="d-none d-sm-block" href="">
            <IoMenuOutline className="icon-main" />
        </a>
    </div>
  )
}

export default NavList