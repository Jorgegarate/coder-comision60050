import React, { useState, useEffect } from "react";
import ItemImage from "./ItemImage";
import ItemDetails from "./ItemDetails";
import { useParams } from "react-router-dom";
import { dbRelationCategoryItem } from "../../data/DbRelationCategoryItem";
import { dbNameCategory } from "../../data/DbNameCategory";
import { detailsProduct } from "../../data/DetailsProduct";
import Breadcrumnbs from "../Breadcrumbs"
import LoadGif from "../LoadGif";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function ItemDetailContainer() {
  const { id } = useParams();
  const productId = parseInt(id, 10);

  const [productDetails, setProductDetails] = useState(null);
  const [categoryName, setCategoryName] = useState("Category");
  const [categoryId, setCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        await delay(2000);
        setIsLoading(true);
        const foundProduct =  detailsProduct.find(product => product.id === productId);
        console.log("Producto encontrado:", foundProduct);

        const foundCategory = dbRelationCategoryItem.find(category =>
          category.items.some(item => item.item === productId)
        );
        console.log("Categoría encontrada:", foundCategory);
        const foundCategoryId = foundCategory?.id;
        console.log("Categoría encontrada:", foundCategory); 

        const foundCategoryName = foundCategory
          ? dbNameCategory.find(category => category.id === foundCategory.id)?.name
          : "Category";
        console.log("Nombre de la categoría:", foundCategoryName);

        setCategoryId(foundCategoryId);
        setCategoryName(foundCategoryName);
        setProductDetails(foundProduct.details[0].name)
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);
  if (isLoading) {
    return <LoadGif/>
  }
  return (
    <div className="container px mx background-product">
      <Breadcrumnbs 
      productName = {productDetails}
      categoryName = {categoryName}
      categoryId ={categoryId}
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
