import Header from "./components/Header"
import Footer from "./components/Footer"
import logo from "./img/JorgeShop.svg"
import ProductPage from "./components/ProductPage"

function App() {

  return (
    <>
      <Header logo ={logo}/>
      <ProductPage/>
      <Footer logo ={logo}/>
    </>
  )
}

export default App
