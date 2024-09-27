import { PiHandbagBold } from "react-icons/pi";


function CartWidget() {
  return (
    <div className="toolbar-icon mr-sm">
        <PiHandbagBold className="icon" />
        <div className="toolbar-count">1</div>
    </div>
  )
}

export default CartWidget