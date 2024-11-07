import { Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./components/item/ItemDetailContainer";
import Layout from "./components/Layout";
import ItemListContainer from "./components/ItemListContainer";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { CartProvider } from "./context/CartProvider";
import Date from "./components/Date";
import CartDetails from "./components/CartDetails";
import Checkout from "./components/Checkout";
function App() {
  return (
    
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element ={<CartDetails/>} />
          <Route path="/checkout" element ={<Checkout/>} />
          <Route path="*" element ={<NotFound/>} />
          <Route path="date" element ={<Date/>} />
        </Routes>
      </Layout>
    </CartProvider>
    
  );
}

export default App;


