import { useState, useEffect } from 'react';
import { dbImage } from "../data/ImageProduct";

function ProductImage({ productId }) {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

  useEffect(() => {
    const foundProduct = dbImage.find(item => item.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image[0].name); // Establecemos la primera imagen como seleccionada por defecto
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (imgName) => {
    setSelectedImage(imgName);
  };

  return (
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
