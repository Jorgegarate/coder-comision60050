import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { dbCarrusel } from '../data/DbCarrusel.js';
import { dbNameCategory } from "../data/DbNameCategory.js";
import { dbRelationCategoryItem } from "../data/DbRelationCategoryItem.js";
import { detailsProduct } from "../data/DetailsProduct.js";
import { dbImage } from "../data/ImageProduct.js";
import serviceConfigNode from "./config/servicesConfig.js";

const app = initializeApp(serviceConfigNode);
const db = getFirestore(app);

export const cargarDatos = async () => {
  try {
    const collections = [
      { name: "dbCarrusel", data: dbCarrusel },
      { name: "dbNameCategory", data: dbNameCategory },
      { name: "dbRelationCategoryItem", data: dbRelationCategoryItem },
      { name: "detailsProduct", data: detailsProduct },
      { name: "dbImage", data: dbImage }
    ];

    for (const { name, data } of collections) {
      const collectionRef = collection(db, name);
      for (const item of data) {
        const docRef = doc(collectionRef, String(item.id)); // Usa el campo `id` del objeto como ID personalizado
        await setDoc(docRef, item);
      }
    }

    console.log("Datos cargados exitosamente a Firestore.");
  } catch (e) {
    console.error("Error al cargar datos a Firestore: ", e);
  }
};
