import React from "react";
import ItemImage from "./ItemImage";
import ItemDetails from "./ItemDetails";
import Breadcrumbs from "../Breadcrumbs";
import { useParams } from "react-router-dom";
import { dbCategory } from "../../data/DbCategory";
import { dbMain } from "../../data/DbMain";
import { dbDetails } from "../../data/DetailsProduct";

function ItemPage() {
  const { id } = useParams();
  const productId = parseInt(id, 10);

  const productDetails = dbDetails.find(product => product.id === productId);
  const categoryId = dbCategory.find(category => 
    category.items.some(item => item.item === productId)
  )?.id;

  const categoryName = categoryId ? 
    dbMain.find(category => category.id === categoryId)?.name : "Categoría";

  return (
    <div className="container mx">
      <Breadcrumbs 
        productName={productDetails?.details[0].name}
        categoryName={categoryName} 
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

export default ItemPage;
