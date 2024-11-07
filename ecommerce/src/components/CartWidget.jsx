import { PiHandbagBold } from "react-icons/pi";
import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";

function CartWidget() {
    const { cartItems } = useCart();
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link to="/cart" className="toolbar-link">
            <div className="toolbar-icon mr-sm">
                <PiHandbagBold className="icon" />
                <div className="toolbar-count">
                    {totalQuantity}
                </div>
            </div>
        </Link>
    );
}

export default CartWidget;
