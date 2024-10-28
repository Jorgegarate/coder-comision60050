import { Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./components/item/ItemDetailContainer";
import Layout from "./components/Layout";
import ItemListContainer from "./components/ItemListContainer";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { CartProvider } from "./context/CartProvider";
import { cargarDatos } from "./services/firebaseService"; 
import { useEffect } from "react";
function App() {
  useEffect(() => {
    cargarDatos();
  }, []);
  return (
    
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="*" element ={<NotFound/>} />
        </Routes>
      </Layout>
    </CartProvider>
    
  );
}

export default App;


