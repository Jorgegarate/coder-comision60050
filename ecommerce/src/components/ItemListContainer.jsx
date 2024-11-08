import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import serviceConfig from '../services/config/servicesConfig';
import LoadGif from './LoadGif';

function ItemListContainer() {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [nameCategory, setNameCategory] = useState({ name: "Todos los productos" });
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState({}); // Estado para almacenar URLs de imágenes

  // Inicializa Firebase y Firestore
  const app = initializeApp(serviceConfig);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Obtiene categorías y relaciones en paralelo
        const [categorySnapshot, relationSnapshot, productSnapshot] = await Promise.all([
          getDocs(collection(db, "dbNameCategory")),
          getDocs(collection(db, "dbRelationCategoryItem")),
          getDocs(collection(db, "detailsProduct"))
        ]);

        // Mapear datos
        const categoriesNames = categorySnapshot.docs.map(doc => doc.data());
        const categories = relationSnapshot.docs.map(doc => doc.data());
        const products = productSnapshot.docs.map(doc => doc.data());

        // Filtrar productos
        const selectedCategory = categoryId 
          ? categories.find(category => category.id === parseInt(categoryId)) 
          : null;

        const filtered = selectedCategory
          ? products.filter(product => selectedCategory.items.some(item => item.item === product.id))
          : products;

        // Nombre de la categoría
        const categoryName = categoryId 
          ? categoriesNames.find(category => category.id === parseInt(categoryId)) 
          : { name: "Todos los productos" };

        // Cargar imágenes en paralelo
        const imagePromises = filtered.map(async product => {
          const imageDocRef = doc(db, "dbImage", String(product.id));
          const imageDoc = await getDoc(imageDocRef);
          return { id: product.id, imageData: imageDoc.exists() ? imageDoc.data().image : null };
        });
        
        const imageResults = await Promise.all(imagePromises);
        const imageMap = imageResults.reduce((map, result) => {
          map[result.id] = result.imageData;
          return map;
        }, {});

        setFilteredProducts(filtered);
        setNameCategory(categoryName || { name: "Todos los productos" });
        setImages(imageMap);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (isLoading) {
    return <LoadGif/>;
  }

  return (
    <div className='container min-height'>
      <h1>{nameCategory.name}</h1>
      <div className='flex-wrap'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className='card' key={product.id}>
              <Link to={`/item/${product.id}`}>
                <img 
                  src={
                    images[product.id]?.[0]?.name
                      ? `/src/assets/img/${images[product.id][0].name}.avif`
                      : `/src/assets/img/placeholder.avif`
                  }
                  alt={product.details?.[0]?.name || 'Imagen de producto'} 
                />
                <h3>{product.details?.[0]?.name || 'Nombre no disponible'}</h3>
                <div className='px my'>
                  {product.details?.[3]?.newcost ? (
                    <>  
                      <div className='d-flex content-space-center'>
                        <p className='cost-new mr-1'>${product.details[3].newcost}</p>
                        <p className='cost-new sale'>
                          {Math.round(((product.details[2].cost - product.details[3].newcost) / product.details[2].cost) * 100)}% OFF
                        </p>
                      </div>
                      <p className={`cost mr-1 ${product.details[3].newcost ? 'tached' : ''}`}>
                        ${product.details[2].cost}
                      </p>
                    </>
                  ) : (
                    <p className='cost mt-2'>${product.details?.[2]?.cost || 'Precio no disponible'}</p>
                  )}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <li>No hay productos disponibles</li>
        )}
      </div>
    </div>
  );
}

export default ItemListContainer;
