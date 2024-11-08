import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartProvider.jsx';
import { db } from '../services/config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import LoadImage from './LoadImage.jsx';
import ItemCount from './item/ItemCount.jsx';
import { Link } from 'react-router-dom';

function CartDetails() {
    const { cartItems, updateCartItemQuantity } = useCart();
    const [productImages, setProductImages] = useState({});
    const [availableQuantities, setAvailableQuantities] = useState({});

    useEffect(() => {
        const fetchProductData = async (productId, color, size) => {
            try {
                const imageDocRef = doc(db, "dbImage", String(productId));
                const imageDoc = await getDoc(imageDocRef);
                if (imageDoc.exists()) {
                    const imageArray = imageDoc.data().image;
                    setProductImages(prevState => ({
                        ...prevState,
                        [productId]: imageArray[0]?.name || null
                    }));
                } else {
                    console.log(`No image found for Product ID: ${productId}`);
                }

                const productRef = doc(db, "detailsProduct", String(productId));
                const productDoc = await getDoc(productRef);
                if (productDoc.exists()) {
                    const foundProduct = productDoc.data();

                    const variant = foundProduct.details[4].variants.find(v => v.color === color);
                    const sizeDetails = variant?.sizes.find(s => s.size === size);
                    const totalInCart = cartItems
                        .filter(item => item.id === productId && item.color === color && item.size === size)
                        .reduce((total, item) => total + item.quantity, 0);

                    setAvailableQuantities(prevState => ({
                        ...prevState,
                        [productId]: sizeDetails ? sizeDetails.cantidad - totalInCart : 0
                    }));

                    
                } else {
                    console.log(`No product details found for Product ID: ${productId}`);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        cartItems.forEach(item => {
            if (!productImages[item.id] || !availableQuantities[item.id]) {
                fetchProductData(item.id, item.color, item.size);
            }
        });
    }, [cartItems]);

    if (!cartItems || cartItems.length === 0) {
        return <p>No hay productos en el carrito.</p>;
    }

    const handleUpdateQuantity = (itemId, newQuantity) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item) {
            const availableQuantity = availableQuantities[itemId];
            if (newQuantity <= availableQuantity) {
                updateCartItemQuantity(itemId, newQuantity);
            } else {
                console.log('Cantidad excedida');
            }
        }
    };

const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
const totalPrice = cartItems.reduce((total, item) => {
    const priceInCents = Math.round(item.price * 1000);
    return total + item.quantity * priceInCents;
}, 0);




    

    return (
        <div className='container px mx'>
            <div className='flex-wrap'>
                <div className='col-8'>
                    <h2 className='mx'>Detalles del Carrito</h2>
                    <div className='gap py px background-product'>
                        {cartItems.map(item => (
                            <div key={`${item.id}-${item.color}-${item.size}`} className="d-flex align-items-center content-space-between mb-3">
                                <div>
                                    {productImages[item.id] ? (
                                        <img 
                                            src={`../src/img/${productImages[item.id]}.avif`} 
                                            alt={`Imagen de ${item.name}`} 
                                            className="img-fluid"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <LoadImage />
                                    )}
                                </div>
                                <div className="ms-3 align-center w-100 py">
                                    <div><strong>{item.name}</strong></div>
                                    <div><strong>Tamaño:</strong> {item.size}</div>
                                    <div><strong>Color:</strong> {item.color}</div>
                                </div>
                                <div className='mx'>
                                    <ItemCount 
                                        initial={item.quantity}
                                        stock={availableQuantities[item.id] || 0}
                                        buttonTitle={`Actualizar`}
                                        onAdd={(newQuantity) => handleUpdateQuantity(item.id, newQuantity)} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='col-4'>
                    <h2 className='mx'>Resumen de la compra</h2>
                    <div className='background-product'>
                        <div>
                            <h3>Productos: {totalQuantity}</h3>
                            <h3>Total: ${totalPrice.toLocaleString().replace(',', '.')}</h3>
                            <Link to="/checkout" className="w-100">
                            <button className='w-100 btn-primary'>Pagar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDetails;
