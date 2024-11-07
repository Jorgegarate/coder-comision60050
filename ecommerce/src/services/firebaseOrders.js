// firebaseOrders.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./config/firebaseConfig"; // Asegúrate de que este archivo exporte la instancia de Firestore

export const cargarOrden = async (formData, cartItems) => {
  try {
    const orderData = {
      ...formData,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      })),
      total: cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
      createdAt: new Date(),
    };

    // Guardar la orden en la colección "orders"
    const docRef = await addDoc(collection(db, "orders"), orderData);
    console.log("Orden creada con ID: ", docRef.id);
  } catch (error) {
    console.error("Error al crear la orden: ", error);
  }
};
