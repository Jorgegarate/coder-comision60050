import React from 'react'

import { cargarDatos } from "../services/firebaseService"; 
import { useEffect } from "react";
function Date() {
    useEffect(() => {
        cargarDatos();
      }, []);
  return (
    <div>Poblaste tu base de datos con el template</div>
  )
}

export default Date