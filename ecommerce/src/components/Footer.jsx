import React from "react";
import NavLinkList from "./NavLinkList";
import { dbNameCategory } from "../data/DbNameCategory";

function Footer(img) {
  const handleCategoryClick = (categoryId) => {
  };

  return (
    <footer className="footer mt-6">
        <div className="container-full">
            <div className="row">
            <div className="col-12 col-md-6 col-xl-3">
                <img src={img.logo} alt="logo" className="w-80" />

                <ul className="footer-links">
                    <li>Políticas de privacidad</li>
                    <li>Términos y condiciones</li>
                </ul>
            </div>
            <div className="col-12 col-md-6 col-xl-3 footer-content">
                <h2>Menú</h2>
                <NavLinkList links={dbNameCategory} onClick={handleCategoryClick} />
            </div>
            <div className="col-12 col-md-6 col-xl-3">
                <h2>Ayuda</h2>
                <ul className="footer-links">
                    <li>Políticas de privacidad</li>
                    <li>Términos y condiciones</li>
                    <li>Mis compras</li>
                    <li>Preguntas Frecuentes</li>
                </ul>
            </div>
            <div className="col-12 col-md-6 col-xl-3">
                <h2>Regístrese para recibir correo electrónico</h2>
                <p>
                    ¡Regístrese para ser el primero en recibir novedades, ventas,
                    contenido exclusivo, eventos y más!
                </p>
                <input type="email" placeholder="Ingrese su correo" className="footer-input" />
                <button className="footer-button">Suscribirse</button>
            </div>
            </div>

        </div>
    </footer>
);

}

export default Footer;
