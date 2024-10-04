import React from 'react';
import { Link } from 'react-router-dom';
import { dbDetails } from '../data/DetailsProduct';

function Categoria() {
  return (
    <div>
      <h1>Categoría</h1>
      <ul>
        {dbDetails.map(product => (
          <li key={product.id}>
            <Link to={`/producto/${product.id}`}>
              {product.details[0].name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categoria;
