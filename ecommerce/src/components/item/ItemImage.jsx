import React, { useState, useEffect } from 'react';
import { dbImage } from "../../data/ImageProduct";
import { useImageSelector } from '../../hooks/useImageSelector';
import Load from '../LoadGif';
function ProductImage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(dbImage.find(item => item.id === productId));
          }, 2000);
        });

        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const { selectedImage, handleImageClick } = useImageSelector(product);

  return loading ? (
    <Load/>
  ) : (
    <div className='container'>
      <div className="image-list">
        <img 
          src={`../src/img/${selectedImage}.avif`} 
          alt={selectedImage} 
          className="col-12"
        />
        
        <div className="image-list swiper swiper-pointer-events">
          <div className="d-flex gap-1 mt-2">
            {product.image.map((img, index) => (
              <img 
                key={index} 
                src={`../src/img/${img.name}.avif`} 
                alt={img.name} 
                className={`img-fluid ${selectedImage === img.name ? 'border border-primary' : ''}`}
                onClick={() => handleImageClick(img.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductImage;
