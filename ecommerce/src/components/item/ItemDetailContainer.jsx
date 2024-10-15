import React, { useState, useEffect } from "react";
import ItemImage from "./ItemImage";
import ItemDetails from "./ItemDetails";
import Breadcrumbs from "../Breadcrumbs";
import { useParams } from "react-router-dom";
import { fetchDbRelationCategoryItem } from "../../data/DbRelationCategoryItem";
import { fetchDbNameCategory } from "../../data/DbNameCategory";
import { fetchDbDetails } from "../../data/DetailsProduct";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function ItemDetailContainer() {
  const { id } = useParams();
  const productId = parseInt(id, 10);

  const [productDetails, setProductDetails] = useState(null);
  const [categoryName, setCategoryName] = useState("Category");
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await delay(2000);

        const details = await fetchDbDetails();
        const relationCategoryItem = await fetchDbRelationCategoryItem();
        const nameCategory = await fetchDbNameCategory();

        const foundProduct = details.find(product => product.id === productId);
        setProductDetails(foundProduct);

        const foundCategory = relationCategoryItem.find(category =>
          category.items.some(item => item.item === productId)
        );
        setCategoryId(foundCategory?.id);

        const foundCategoryName = foundCategory
          ? nameCategory.find(category => category.id === foundCategory.id)?.name
          : "Category";
        setCategoryName(foundCategoryName);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [productId]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px mx background-product">
      <Breadcrumbs 
        productName={productDetails?.details[0].name}
        categoryName={categoryName} 
        categoryId={categoryId}
        productId={productId}
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
