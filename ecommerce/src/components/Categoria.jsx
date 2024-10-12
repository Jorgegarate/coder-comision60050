import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { dbDetails } from '../data/DetailsProduct';
import { dbRelationCategoryItem } from '../data/DbRelationCategoryItem';
import { dbNameCategory } from '../data/DbNameCategory';
import { dbImage } from '../data/ImageProduct';

function Categoria() {
  const { categoryId } = useParams();
  console.log(categoryId)
  const nameCategory = dbNameCategory.find(category => category.id === parseInt(categoryId));  
  const selectedCategory = dbRelationCategoryItem.find(category => category.id === parseInt(categoryId));

  if (!selectedCategory) {
    return <h1>No se encontró la categoría</h1>;
  }
  const getFirstImage = (productId) => {
    const productImages = dbImage.find(product => product.id === productId);
    return productImages ? productImages.image[0].name : null; 
  };
  const filteredProducts = dbDetails.filter(product =>
    selectedCategory.items.some(item => item.item === product.id)
  );
  return (
    <div>
      <h1>Categoría {nameCategory.name}</h1>
      <div className='flex-wrap '>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className='card' key={product.id}>
              <Link to={`/detail/${product.id}`}>

                <img className='' 
                  src={`../src/img/${getFirstImage(product.id)}.avif`} 
                  alt={product.details[0].name} 
                />
                <h3>{product.details[0].name}</h3>
                
              </Link>
            </div>
            
          ))
        ) : (
          <li>No hay productos en esta categoría</li>
        )}
      </div>
    </div>
  );
}

export default Categoria;