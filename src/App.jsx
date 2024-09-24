import Header from "./components/Header.jsx"
import logo from './img/logo.svg';
import Carrusel from "./components/Carrusel.jsx"
import Main from "./components/Main.jsx"
import Footer from "./components/Footer.jsx"
import Polera from './img/polera.jpg';
function App() {
  
  return (
    <>
      <Header logo={logo}
      />
      <Carrusel />
      <Main
      />
      < Footer logo={logo} />
    </>
  )
}

export default App;