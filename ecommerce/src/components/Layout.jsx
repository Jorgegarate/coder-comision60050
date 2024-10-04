import Header from "../components/Header"
import Footer from "../components/Footer"
import logo from "../img/JorgeShop.svg"

function Layout({children}) {
  return (
    <>
    <Header logo ={logo}/>
       <div>
         {children}
       </div>
    <Footer logo ={logo}/>
    </>
  )
}

export default Layout