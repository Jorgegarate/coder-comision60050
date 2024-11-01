import React, { useState, useEffect } from 'react';
import { useImageSelector } from '../../hooks/useImageSelector';
import Load from '../LoadGif';
import { db } from '../../services/config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore'; // Asegúrate de importar getDoc

function ProductImage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
          const imageDocRef = doc(db, "dbImage", String(productId)); // Usa productId aquí
          const imageDoc = await getDoc(imageDocRef);
           setProduct({ ...imageDoc, image: imageDoc.exists() ? imageDoc.data().image : null });
        
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
    <Load />
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
            {product && product.image.map((img, index) => (
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
