import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Cargar el carrito desde localStorage al iniciar
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Guardar el carrito en localStorage cada vez que se actualice
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        const existingItemIndex = cartItems.findIndex(
            (cartItem) => 
                cartItem.id === item.id && 
                cartItem.color === item.color && 
                cartItem.size === item.size
        );

        if (existingItemIndex >= 0) {
            const updatedItems = [...cartItems];
            updatedItems[existingItemIndex].quantity += item.quantity;
            setCartItems(updatedItems);
        } else {
            setCartItems([...cartItems, item]);
        }
    };

    const getTotalInCartForSelectedItem = (id, color, size) => {
        const item = cartItems.find(
            (cartItem) => 
                cartItem.id === id && 
                cartItem.color === color && 
                cartItem.size === size
        );
        return item ? item.quantity : 0;
    };

    const validateAndAddToCart = (item, availableQuantity) => {
        const totalInCart = getTotalInCartForSelectedItem(item.id, item.color, item.size);
        const totalQuantityToAdd = totalInCart + item.quantity;

        if (totalQuantityToAdd <= availableQuantity) {
            addToCart(item);
            return { success: true, errorMessage: '' };
        } else {
            return { success: false, errorMessage: 'Cantidad excedida' };
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getTotalInCartForSelectedItem, validateAndAddToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);
