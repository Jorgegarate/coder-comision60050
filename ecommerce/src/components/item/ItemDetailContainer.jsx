import React, { useState, useEffect } from "react";
import ItemImage from "./ItemImage";
import ItemDetails from "./ItemDetails";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Breadcrumbs from "../Breadcrumbs";
import LoadGif from "../LoadGif";

function ItemDetailContainer() {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const [productDetails, setProductDetails] = useState(null);
  const [categoryName, setCategoryName] = useState("Category");
  const [categoryId, setCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const querySnapshot = await getDocs(collection(db, "dbRelationCategoryItem"));

        const relationData = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .find(doc => doc.items.some(itemObj => itemObj.item === productId));

        let categoryName = "Category";
        if (relationData) {
          const categoryDoc = await getDocs(collection(db, "dbNameCategory"));
          const categoryData = categoryDoc.docs.find(doc => doc.id === String(relationData.id));

          if (categoryData) {
            categoryName = categoryData.data().name;
          } 
        }

        const productSnapshot = await getDocs(collection(db, "detailsProduct"));
        const foundProduct = productSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .find(product => product.id === productId);


        setCategoryId(relationData?.id);
        setCategoryName(categoryName);
        setProductDetails(foundProduct ? foundProduct.details[0].name : "Detalles no disponibles");
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, db]);

  if (isLoading) {
    return <LoadGif />;
  }

  return (
    <div className="container px mx background-product">
      <Breadcrumbs 
        productName={productDetails || "Cargando..."}
        categoryName={categoryName}
        categoryId={categoryId}
      />
      <div className="row mt-6">
        <div className="col-12 col-sm-8 col-xl-7">
          <div>
            <ItemImage productId={productId} />
          </div>
        </div>
        <div className="col-12 col-sm-4 col-xl-5">
          <ItemDetails productId={productId} />
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
