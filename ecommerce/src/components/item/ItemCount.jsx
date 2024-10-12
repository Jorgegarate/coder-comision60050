import { useState } from "react";

const ItemCount = (props) => {
    const [contador, setContador] = useState(props.initial);

    const handleClick = () => {
        if (props.stock > contador) {
            setContador(contador + 1);
        } 
    };

    const restar = () => {
        if (contador > 0) {
            setContador(contador - 1);
        }
    };

    const handleAddToCart = () => {
        props.onAdd(contador);
    };

    return (
        <>
            <div className="tf-sticky-atc-btns mx">
                <div className="wg-quantity">
                    <span className="btn-quantity minus-btn" onClick={restar}>-</span>
                    <p>{contador}</p>
                    <span className="btn-quantity plus-btn" onClick={handleClick}>+</span>
                </div>
                <button onClick={handleAddToCart} className='w-100 btn-primary'>Pagar</button>
            </div>
        </>
    );
}

export default ItemCount;

