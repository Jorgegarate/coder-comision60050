import { useState, useEffect } from "react";

export function useProduct(id) {
  const [productId, setProductId] = useState(id);

  useEffect(() => {
    // Aquí podrías realizar alguna llamada a una API para obtener más datos del producto
    // Por simplicidad, solo se establece el id pasado
    setProductId(id);
  }, [id]);

  return { productId };
}
