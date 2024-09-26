import ItemCount from "./ItemCount"
const Item = (props) => {
    const miOnAdd = () => {}
    return (
        <div>
            <div className='hijo'> {/* Primer hijo */}
                <img src={`src/img/${props.imagen}.jpg`} alt={props.nombre} />
                <div className='product'>
                    <h4>{props.nombre}</h4>
                    <p>$<span>{props.valor}</span></p>
                    <p>$<span>{props.newvalor}</span></p>
                </div>
            </div>
            <ItemCount 
                initial={1}
                stock={props.cantidad}
                onAdd={miOnAdd}  
            /> 
        </div>
    )
}
export default Item