import React from 'react';
import bannerImage from '../img/imagen-banner.webp';

function Carrusel() {
    return (
        <div
            className="background-carrusel"
        >
            <div className="container-full pv-100">
                <h2 className="">
                    Esta es una web con React
                </h2>
                <p className="">Compra con un 40% de descuento</p>
                <button className="">Ver Más</button>
            </div>
        </div>
    );
}

export default Carrusel;
