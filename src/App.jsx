import Header from "./components/Header.jsx"
import logo from './img/TiendaDeJorge.svg';
import Carrusel from "./components/Carrusel.jsx"
import ItemListContainer from "./components/ItemListContainer.jsx"
import Footer from "./components/Footer.jsx"
import Polera from './img/polera.jpg';
function App() {
  
  return (
    <>
      <Header logo={logo}/>
      <Carrusel />
      <ItemListContainer/>
      <Footer logo={logo}/>
    </>
  )
}

export default App;