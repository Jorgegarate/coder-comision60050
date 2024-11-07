import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/config/firebaseConfig';
import ItemCount from './ItemCount';
import { useCart } from '../../context/CartProvider';
import Load from '../LoadGif';

function ProductDetails({ productId }) {
    const { validateAndAddToCart, getTotalInCartForSelectedItem } = useCart();
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productRef = doc(db, "detailsProduct", String(productId));
                const productDoc = await getDoc(productRef);

                if (productDoc.exists()) {
                    const foundProduct = productDoc.data();
                    setProduct(foundProduct);
                    
                    const defaultVariant = foundProduct.details[4].variants[0];
                    setSelectedVariant(defaultVariant);
                    setSelectedSize(defaultVariant.sizes[0].size);
                } else {
                    console.error("Producto no encontrado en Firebase");
                }
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        if (product && selectedVariant) {
            const sizeDetails = selectedVariant.sizes.find(s => s.size === selectedSize);
            const totalInCart = getTotalInCartForSelectedItem(product.id, selectedVariant.color, selectedSize);
            setAvailableQuantity(sizeDetails ? sizeDetails.cantidad - totalInCart : 0);
            setErrorMessage('');
        }
    }, [product, selectedVariant, selectedSize]);

    const handleVariantChange = (color) => {
        const variant = product.details[4].variants.find(v => v.color === color);
        setSelectedVariant(variant);
        setSelectedSize(variant.sizes[0].size);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const miOnAdd = (cantidadSeleccionada) => {
        const newItem = {
            id: product.id,
            name: product.details[0].name,
            color: selectedVariant.color,
            size: selectedSize,
            price: product.details[3].newcost || product.details[2].cost,
            quantity: cantidadSeleccionada,
        };

        // Validar la cantidad y agregar al carrito
        const { success, errorMessage } = validateAndAddToCart(newItem, availableQuantity);
        setErrorMessage(errorMessage);

        if (success) {
            setAvailableQuantity(availableQuantity - cantidadSeleccionada);  // Actualizar cantidad disponible
        }
    };

    if (loading) return <Load />;

    if (!product || !selectedVariant) return <p>Producto no encontrado.</p>;

    return (
        <div className='sticky'>
            <h3 className='title-product mt-2 secundary'>{product.details[0].name}</h3>
            <p className='mt-2'>{product.details[1].description}</p>
            <div className='mt-2 d-flex align-items-center'>
                {product.details[3].newcost ? (
                    <>
                        <p className='cost-new mr-1'>${product.details[3].newcost}</p>
                        <p className={`cost mr-1 ${product.details[3].newcost ? 'tached' : ''}`}>
                            ${product.details[2].cost}
                        </p>
                        <p className='cost-new sale'>
                            {Math.round(((product.details[2].cost - product.details[3].newcost) / product.details[2].cost) * 100)}% OFF
                        </p>
                    </>
                ) : (
                    <p className='cost mt-2'>${product.details[2].cost}</p>
                )}
            </div>
            <div className='mt-2'>
                <label>Color:</label>
                <select onChange={(e) => handleVariantChange(e.target.value)} value={selectedVariant.color}>
                    {product.details[4].variants.map(variant => (
                        <option key={variant.color} value={variant.color}>
                            {variant.color}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mt-2'>
                <label>Tamaño:</label>
                <select onChange={(e) => handleSizeChange(e.target.value)} value={selectedSize}>
                    {selectedVariant.sizes.map(size => (
                        <option key={size.size} value={size.size}>
                            {size.size}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <ItemCount 
                    initial={1}
                    stock={availableQuantity}
                    onAdd={miOnAdd}
                    buttonTitle={`Agregar`}
                />
            </div>
            {errorMessage ? (
                <p style={{ color: 'red' }}>{errorMessage}</p>
            ) : (
                <p>Cantidad disponible: {availableQuantity}</p>
            )}
        </div>
    );
}

export default ProductDetails;
