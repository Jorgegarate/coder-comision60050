import { PiHandbagBold } from "react-icons/pi";
import { useCart } from "../context/CartProvider";
import CartDetails from "./CartDetails";
function CartWidget() {
    const { cartItems } = useCart();

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
      <div>
      <div className="toolbar-icon mr-sm">
      <PiHandbagBold className="icon" />
      <div className="toolbar-count">
          {totalQuantity}
      </div>
      </div>
      <div className="cart">
      <CartDetails/>
      </div>
      </div>

    );
}

export default CartWidget;
