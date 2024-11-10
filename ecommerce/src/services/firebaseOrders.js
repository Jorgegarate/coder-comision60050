import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebaseConfig";


export const cargarOrden = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), orderData);

    return docRef.id; 
  } catch (error) {
    console.error("Error al registrar la orden:", error);
    throw error;
  }
};

export const checkOrderExists = async (orderId) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true; 
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
