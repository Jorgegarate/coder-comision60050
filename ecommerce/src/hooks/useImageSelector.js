import { useState, useEffect } from 'react';

export function useImageSelector(product) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product && product.image.length > 0) {
      setSelectedImage(product.image[0].name);
    }
  }, [product]);

  const handleImageClick = (imgName) => {
    setSelectedImage(imgName);
  };

  return { selectedImage, handleImageClick };
}
