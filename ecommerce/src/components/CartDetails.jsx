import { useCart } from '../context/CartProvider';

function CartDetails() {
    const { cartItems } = useCart();

    if (!cartItems || cartItems.length === 0) {
        return <p>No hay productos en el carrito.</p>;
    }

    return (
        <div>
            <h2>Detalles del Carrito</h2>
            {cartItems.map(item => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="d-flex">
                    <div>{item.name}</div>
                    <div>{item.size}</div>
                    <div>{item.quantity}</div>
                </div>
            ))}
        </div>
    );
}

export default CartDetails;

