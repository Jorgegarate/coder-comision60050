import Item from "./Item.jsx"
import Polera from '../img/polera.jpg';

const Main = () => {
    const poleras = [
        {
            id: 1,
            imagen: Polera,
            nombre: "Polera 1",
            valor: "3490",
            newvalor: "2980"
        },
        {
            id: 2,
            imagen: Polera,
            nombre: "Polera 2",
            valor: "3990",
            newvalor: "3480"
        },
        {
            id: 3,
            imagen: Polera,
            nombre: "Polera 3",
            valor: "4500",
            newvalor: "4000"
        }
    ];

    return (
        <div className='card-product container'>
        <div>
            <h2 className='title'>titulo de los productos</h2>
        </div>
        <div className='padre'>
            {poleras.map(polera => (
                <Item       
                    key={polera.id}
                    polera={polera.imagen}
                    nombre={polera.nombre}
                    valor={polera.valor}
                    newvalor={polera.newvalor}
                />
            ))}
        </div>
        </div>
    );
}

export default Main;