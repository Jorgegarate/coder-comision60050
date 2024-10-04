import { useState, useEffect } from "react";

export function useProduct(id) {
  const [productId, setProductId] = useState(id);

  useEffect(() => {
    setProductId(id);
  }, [id]);

  return { productId };
}
