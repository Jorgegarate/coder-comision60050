import { useState, useEffect } from 'react';
import { detailsProduct } from "../../data/DetailsProduct";
import ItemCount from './ItemCount';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function ProductDetails({ productId }) {
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                await delay(200);

                const foundProduct = detailsProduct.find(item => item.id === productId);
                if (foundProduct) {
                    setProduct(foundProduct);
                    const defaultVariant = foundProduct.details[4].variants[0];
                    setSelectedVariant(defaultVariant);
                    setSelectedSize(defaultVariant.sizes[0].size);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        if (product && selectedVariant) {
            const sizeDetails = selectedVariant.sizes.find(s => s.size === selectedSize);
            const availableQuantity = sizeDetails ? sizeDetails.cantidad : 0;
            const totalInCart = getTotalInCartForSelectedItem();
            setAvailableQuantity(availableQuantity - totalInCart);
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

    const getTotalInCartForSelectedItem = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = existingCart.find(item =>
            item.id === product.id && item.color === selectedVariant.color && item.size === selectedSize
        );
        return existingItem ? existingItem.quantity : 0; 
    };

    const miOnAdd = (cantidadSeleccionada) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const newItem = {
            id: product.id,
            name: product.details[0].name,
            color: selectedVariant.color,
            size: selectedSize,
            price: product.details[3].newcost || product.details[2].cost,
            quantity: cantidadSeleccionada
        };

        const existingItemIndex = existingCart.findIndex(item =>
            item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
        );

        const sizeDetails = selectedVariant.sizes.find(s => s.size === selectedSize);
        const availableQuantity = sizeDetails ? sizeDetails.cantidad : 0;
        const currentQuantityInCart = existingItemIndex >= 0 ? existingCart[existingItemIndex].quantity : 0;
        const totalQuantityToAdd = currentQuantityInCart + cantidadSeleccionada;

        if (totalQuantityToAdd <= availableQuantity) {
            if (existingItemIndex >= 0) {
                existingCart[existingItemIndex].quantity += cantidadSeleccionada; 
            } else {
                existingCart.push(newItem);
            }

            localStorage.setItem('cart', JSON.stringify(existingCart));
            console.log('Producto agregado al carrito:', existingCart);
            setErrorMessage('');
        } else {
            setErrorMessage('Cantidad excedida');
        }
    };

    if (!product || !selectedVariant) {
        return;
    }

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
