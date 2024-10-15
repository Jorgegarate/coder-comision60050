import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { detailsProduct } from '../data/DetailsProduct';
import { dbRelationCategoryItem } from '../data/DbRelationCategoryItem';
import { dbNameCategory } from '../data/DbNameCategory';
import { dbImage } from '../data/ImageProduct';

function ItemListContainer() {
  const { categoryId } = useParams();
  
  const selectedCategory = categoryId 
    ? dbRelationCategoryItem.find(category => category.id === parseInt(categoryId))
    : null;

  const filteredProducts = categoryId
    ? detailsProduct.filter(product =>
        selectedCategory.items.some(item => item.item === product.id)
      )
    : detailsProduct;

  const nameCategory = categoryId 
    ? dbNameCategory.find(category => category.id === parseInt(categoryId))
    : { name: "Todos los productos" };

  if (categoryId && !selectedCategory) {
    return (
      <div className='container min-height'>
        <h1>No se encontró la categoría</h1>
      </div>
    );
  }

  const getFirstImage = (productId) => {
    const productImages = dbImage.find(product => product.id === productId);
    return productImages ? productImages.image[0].name : null; 
  };

  return (
    <div className='container min-height'>
      <h1>{nameCategory.name}</h1>
      <div className='flex-wrap'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className='card' key={product.id}>
              <Link to={`/item/${product.id}`}>
                <img 
                  src={`../src/img/${getFirstImage(product.id)}.avif`} 
                  alt={product.details[0].name} 
                />
                <h3>{product.details[0].name}</h3>
                <div className='px my'>
                  {product.details[3].newcost ? (
                    <>  
                      <div className='d-flex content-space-center'>
                        <p className='cost-new mr-1'>${product.details[3].newcost}</p>
                        <p className='cost-new sale'>
                          {Math.round(((product.details[2].cost - product.details[3].newcost) / product.details[2].cost) * 100)}% OFF
                        </p>
                      </div>
                      <p className={`cost mr-1 ${product.details[3].newcost ? 'tached' : ''}`}>
                        ${product.details[2].cost}
                      </p>
                    </>
                  ) : (
                    <p className='cost mt-2'>${product.details[2].cost}</p>
                  )}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <li>No hay productos disponibles</li>
        )}
      </div>
    </div>
  );
}

export default ItemListContainer;
