import { Routes, Route } from "react-router-dom";
import ItemPage from "./components/item/ItemPage";
import Layout from "./components/Layout";
import Categoria from "./components/Categoria"; // Asegúrate de tener este componente
import Home from "./components/Home"; // Suponiendo que tienes una página de inicio

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/producto/:id" element={<ItemPage />} /> {/* Ruta dinámica para el producto */}
      </Routes>
    </Layout>
  );
}

export default App;


