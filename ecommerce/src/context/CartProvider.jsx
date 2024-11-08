import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
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

    const updateCartItemQuantity = (itemId, newQuantity) => {
        const updatedItems = cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ).filter(item => item.quantity > 0); // Eliminar items con cantidad 0

        setCartItems(updatedItems);
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

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            updateCartItemQuantity, 
            getTotalInCartForSelectedItem, 
            validateAndAddToCart, 
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
