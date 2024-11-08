import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartProvider'; 
import aprobado from '../assets/aprobado.gif';
import { checkOrderExists } from '../services/firebaseOrders'; // Asegúrate de importar correctamente
import LoadGif from './LoadGif';

function ResultOrder() {
  const { id } = useParams(); 
  const { clearCart } = useCart(); 
  const navigate = useNavigate();
  const [orderExists, setOrderExists] = useState(null); 

  useEffect(() => {
    async function validateOrder() {
      const exists = await checkOrderExists(id); // Verifica si el ID de la orden existe en la DB
      setOrderExists(exists);
      if (exists) clearCart(); // Limpia el carrito solo si la orden es válida
    }
    validateOrder();
  }, [id]);

  if (orderExists === null) {
    return <LoadGif/>;
  }

  if (!orderExists) {
    return (
      <div className='container'>
        <div className='background-product min-height align-center card'>
            <h1>Orden no válida</h1>
            <p>El ID de la orden proporcionado no es válido.</p>
            <button className='btn-primary px py mt-2' onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Resultado de la Orden</h1>
      <div className='background-product min-height align-center card'>
        <img className="w-100" src={aprobado} alt="logo" /> 
        <p>El ID de la orden es:</p>
        <p><span className='title-product mt-2'>{id}</span></p>
        <button className='btn-primary px py mt-2' onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  );
}

export default ResultOrder;
