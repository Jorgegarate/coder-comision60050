import React from 'react';
import bannerImage from '../img/imagen-banner.webp'; // Ajusta la ruta según tu estructura

function Carrusel() {
    return (
        <div
            className="fondo align-center"
            style={{ backgroundImage: `url(${bannerImage})` }} // Establece la imagen de fondo
        >
            <div className="container">
                <h2 className="title">
                    Esta es una web con React
                </h2>
                <p className="sub-title">Compra con un 40% de descuento</p>
                <button className="btn btn-color">Ver Más</button>
            </div>
        </div>
    );
}

export default Carrusel;
