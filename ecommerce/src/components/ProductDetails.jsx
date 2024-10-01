import { useState, useEffect } from 'react';
import { dbDetails } from "../data/DetailsProduct";

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = dbDetails.find(item => item.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='my'>
      <h3 className='title-product mt-2 '>{product.details[0].name}</h3>
      <p className='mt-2'>{product.details[1].description}</p>
      <div className='mt-2 d-flex align-items-center'>
        {product.details[3].newcost ? (
            <>
            <p className='cost-new mr-2'>${product.details[3].newcost}</p>

            <p className={`cost mr-2 ${product.details[3].newcost ? 'tached' : ''}`}>
                ${product.details[2].cost}
            </p>

            <p className='cost-new sale'>
                {Math.round(((product.details[2].cost - product.details[3].newcost) / product.details[2].cost) * 100)}% OFF
            </p>
            </>
        ) : (
            <p className='cost mt-2'>${product.details[2].cost}</p>
        )}
      </div>

      <p>Cantidad disponible: {product.details[4].cantidad}</p>
      <p>Tamaños: {product.details[5].sizes.join(', ')}</p>
      <p>Colores: {product.details[6].color.join(', ')}</p>
    </div>
  );
}

export default ProductDetails;
