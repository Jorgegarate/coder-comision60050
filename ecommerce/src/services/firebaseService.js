import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { dbCarrusel } from "../data/DbCarrusel";
import { dbNameCategory } from "../data/dbNameCategory";
import { dbRelationCategoryItem } from "../data/dbRelationCategoryItem";
import { detailsProduct } from "../data/detailsProduct";
import { dbImage } from "../data/ImageProduct";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const cargarDatos = async () => {
  try {
    // Cargar cada colección en Firestore
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
        await addDoc(collectionRef, item);
      }
    }

    console.log("Datos cargados exitosamente a Firestore.");
  } catch (e) {
    console.error("Error al cargar datos a Firestore: ", e);
  }
};
