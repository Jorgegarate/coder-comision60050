import React, { useState } from 'react';
import { useCart } from '../context/CartProvider'; 

function Checkout() {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    nombre: '',
    apellido: '',
    region: '',
    provincia: '',
    comuna: '',
    direccion: '',
    detalles: ''
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    }
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Los correos electrónicos deben coincidir";
    }
    if (!formData.nombre) {
      newErrors.nombre = "El nombre es obligatorio";
    }
    if (!formData.apellido) {
      newErrors.apellido = "El apellido es obligatorio";
    }
    if (!formData.direccion) {
      newErrors.direccion = "La dirección es obligatoria";
    }
    if (!formData.region) {
      newErrors.region = "La región es obligatoria";
    }
    if (!formData.provincia) {
      newErrors.provincia = "La provincia es obligatoria";
    }
    if (!formData.comuna) {
      newErrors.comuna = "La comuna es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Aquí puedes procesar la información de la compra
    }
  };

  return (
    <div className="mx">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="container">
          <div className="col-12 form-card px py">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="email">Correo Electrónico <span>*</span></label>
                <input
                  className={`form-control ${errors.email ? 'border-red' : 'border-green'}`}
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error-text alert-red">{errors.email}</p>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="confirmEmail">Confirmar Correo Electrónico <span>*</span></label>
                <input
                  className={`form-control ${errors.confirmEmail ? 'border-red' : 'border-green'}`}
                  id="confirmEmail"
                  type="email"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                />
                {errors.confirmEmail && <p className="error-text alert-red">{errors.confirmEmail}</p>}
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="nombre">Nombre <span>*</span></label>
                <input
                  className={`form-control ${errors.nombre ? 'border-red' : 'border-green'}`}
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && <p className="error-text alert-red">{errors.nombre}</p>}
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="apellido">Apellido <span>*</span></label>
                <input
                  className={`form-control ${errors.apellido ? 'border-red' : 'border-green'}`}
                  id="apellido"
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                />
                {errors.apellido && <p className="error-text alert-red">{errors.apellido}</p>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="direccion">Dirección <span>*</span></label>
                <input
                  className={`form-control ${errors.direccion ? 'border-red' : 'border-green'}`}
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                />
                {errors.direccion && <p className="error-text alert-red">{errors.direccion}</p>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="region">Región <span>*</span></label>
                <input
                  className={`form-control ${errors.region ? 'border-red' : 'border-green'}`}
                  id="region"
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                />
                {errors.region && <p className="error-text alert-red">{errors.region}</p>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="provincia">Provincia <span>*</span></label>
                <input
                  className={`form-control ${errors.provincia ? 'border-red' : 'border-green'}`}
                  id="provincia"
                  type="text"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                />
                {errors.provincia && <p className="error-text alert-red">{errors.provincia}</p>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="comuna">Comuna <span>*</span></label>
                <input
                  className={`form-control ${errors.comuna ? 'border-red' : 'border-green'}`}
                  id="comuna"
                  type="text"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                />
                {errors.comuna && <p className="error-text alert-red">{errors.comuna}</p>}
              </div>
              <div className="col-12 mb-3">
                <label className="form-label" htmlFor="detalles">Detalles Adicionales</label>
                <textarea
                  className="form-control"
                  id="detalles"
                  name="detalles"
                  value={formData.detalles}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <aside className="aside--color">
            <div id="carrito">
              <div className="container">
                <h4 className="mb-3">Carrito de compras</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={`${item.id}-${item.color}-${item.size}`}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{(item.quantity * item.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row" colSpan="2">Total</th>
                      <td>
                        {cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <button type="submit" className="btn btn-dark btn-medium--lg">Pagar</button>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
