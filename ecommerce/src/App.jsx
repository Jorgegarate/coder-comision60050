import { Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./components/item/ItemDetailContainer";
import Layout from "./components/Layout";
import ItemListContainer from "./components/ItemListContainer";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="*" element ={<NotFound/>} />
      </Routes>
    </Layout>
  );
}

export default App;


