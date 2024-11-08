import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebaseConfig";

// Función para cargar una nueva orden en Firestore
export const cargarOrden = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    console.log("Orden registrada con ID:", docRef.id);
    return docRef.id; // Retornamos el ID de la orden
  } catch (error) {
    console.error("Error al registrar la orden:", error);
    throw error;
  }
};

// Función para verificar si una orden existe en Firestore
export const checkOrderExists = async (orderId) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true; // La orden existe
    } else {
      return false; // La orden no existe
    }
  } catch (error) {
    console.error("Error al verificar la orden:", error);
    throw error;
  }
};
