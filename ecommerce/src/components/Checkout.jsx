import React, { useState } from 'react';
import { useCart } from '../context/CartProvider';
import { cargarOrden } from '../services/firebaseOrders'; 
import { Link, useNavigate } from 'react-router-dom';

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
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderData = {
        ...formData,
        items: cartItems,
        total: cartItems.reduce((total, item) => total + item.quantity * (item.price * 1000), 0),
        fecha: new Date().toISOString()
      };

      try {
        const newOrderId = await cargarOrden(orderData);
        setOrderId(newOrderId);
         navigate(`/resultOrder/${newOrderId}`);
      } catch (error) {
        console.error("Error al cargar la orden:", error);
      }
    }
  };

  return (
    <div className="mx">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap">
          <div className="col-8 form-card px">
            <div className="row">
              <div className="col-12 col-md-6">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                {errors.email && <span className="text-danger">{errors.email}</span>}
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="confirmEmail">Confirmar Correo Electrónico</label>
                <input
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                {errors.confirmEmail && <span className="text-danger">{errors.confirmEmail}</span>}
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                {errors.nombre && <span className="text-danger">{errors.nombre}</span>}
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                {errors.apellido && <span className="text-danger">{errors.apellido}</span>}
              </div>

              <div className="col-12">
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                {errors.direccion && <span className="text-danger">{errors.direccion}</span>}
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="region">Región</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                {errors.region && <span className="text-danger">{errors.region}</span>}
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="provincia">Provincia</label>
                <input
                  type="text"
                  id="provincia"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                {errors.provincia && <span className="text-danger">{errors.provincia}</span>}
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="comuna">Comuna</label>
                <input
                  type="text"
                  id="comuna"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
                {errors.comuna && <span className="text-danger">{errors.comuna}</span>}
              </div>

              <div className="col-12">
                <label htmlFor="detalles">Detalles (opcional)</label>
                <textarea
                  id="detalles"
                  name="detalles"
                  value={formData.detalles}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="col-4 card">
    <aside className="">
        <div id="carrito">
            <div className="container">
                <h4 className="mb-3">Carrito de compras</h4>
                
                <div className="d-flex content-space-between py border-bottom mx">
                    <div><strong>Item</strong></div>
                    <div><strong>Cantidad</strong></div>
                    <div><strong>Total</strong></div>
                </div>
                
                {cartItems.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="d-flex content-space-between py border-bottom">
                        <div>
                            {item.name.length > 5 ? `${item.name.slice(0, 5)}....` : item.name}
                        </div>
                        <div>{item.quantity}</div>
                        <div>{(item.quantity * (item.price * 1000)).toLocaleString()}</div>
                    </div>
                ))}

                
                <div className="d-flex content-space-between py mt-3 border-top">
                    <div><strong>Total</strong></div>
                    <div>
                        <strong>
                            {cartItems.reduce((total, item) => total + item.quantity * (item.price * 1000), 0).toLocaleString()}
                        </strong>
                    </div>
                </div>
                
                <button type="submit" className="w-100 btn-primary mx">Pagar</button>
            </div>
        </div>
    </aside>
          </div>

        </div>


      </form>
    </div>
  );
}

export default Checkout;
