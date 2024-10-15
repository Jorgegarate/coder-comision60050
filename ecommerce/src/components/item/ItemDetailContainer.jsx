import React, { useState, useEffect } from "react";
import ItemImage from "./ItemImage";
import ItemDetails from "./ItemDetails";
import Breadcrumbs from "../Breadcrumbs";
import { useParams } from "react-router-dom";
import { dbRelationCategoryItem } from "../../data/DbRelationCategoryItem";
import { dbNameCategory } from "../../data/DbNameCategory";
import { detailsProduct } from "../../data/DetailsProduct";
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
        setIsLoading(true);  // Indicamos que está cargando

        await delay(2000);  // Simulamos un retraso para la carga

        const details = await detailsProduct();
        const relationCategoryItem = await dbRelationCategoryItem();
        const nameCategory = await dbNameCategory();

        const foundProduct = details.find(product => product.id === productId);

        const foundCategory = relationCategoryItem.find(category =>
          category.items.some(item => item.item === productId)
        );
        const foundCategoryId = foundCategory?.id;

        const foundCategoryName = foundCategory
          ? nameCategory.find(category => category.id === foundCategory.id)?.name
          : "Category";

        // Verificamos que se encontró el producto antes de actualizar el estado
        if (foundProduct) {
          setProductDetails(foundProduct);
          setCategoryId(foundCategoryId);
          setCategoryName(foundCategoryName);
        } else {
          console.error("Producto no encontrado");
        }
        
        setIsLoading(false);  // Una vez que todos los datos estén cargados, dejamos de cargar
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);  // Detenemos la carga si hay un error
      }
    };

    fetchData();
  }, [productId]);

  // Si todavía está cargando, mostramos el componente LoadGif
  if (isLoading) {
    return <div><LoadGif /></div>;
  }

  // Si los detalles del producto no existen, mostramos un mensaje de error
  if (!productDetails) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="container px mx background-product">
      <Breadcrumbs 
        productName={productDetails.details[0].name}
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
