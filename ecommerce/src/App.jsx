import { Routes, Route } from "react-router-dom";
import ItemPage from "./components/item/ItemPage";
import Layout from "./components/Layout";
import Categoria from "./components/Categoria";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<Categoria />} />
        <Route path="/detail/:id" element={<ItemPage />} />
        <Route path="*" element ={<NotFound/>} />
      </Routes>
    </Layout>
  );
}

export default App;


