import { useEffect, useState } from "react";
import Item from "./Item.jsx";
import { db } from "../data/Db.js";

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(db);
  }, []);

  return (
    <div className='card-product container'>
      <div>
        <h2 className='title'>título de los productos</h2>
      </div>
      <div className='padre'>
        {data.map(item => ( 
          <Item
            key={item.id}
            imagen={item.imagen}
            nombre={item.nombre}
            valor={item.valor}
            newvalor={item.newvalor}
            cantidad={item.cantidad}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
