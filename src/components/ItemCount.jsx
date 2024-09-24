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

    return (
        <>
            <div className="cantidad">
                <button className='btn btn-color' onClick={restar}>-</button>
                <p>Cantidad: <span>{contador}</span></p>
                <button className='btn btn-color' onClick={handleClick}>+</button>
            </div>
            <div>
                <button onClick={props.onAdd} className='btn btn-color'>Pagar</button> {/* Cambiado a onClick */}
            </div>
        </>
    );
}

export default ItemCount;
