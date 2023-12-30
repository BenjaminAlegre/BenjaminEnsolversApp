import React, { useState } from 'react';
import NotaApi from '../api/NotaApi';

import '../styles/AgregarNota.css';
import { Link, useNavigate } from 'react-router-dom';




const AgregarNota = ({ cerrarFormulario, cargarNotas }) => {

  let navegacion = useNavigate();


  const [nota, setNota] = useState({
    nombre: '',
    contenido: ''
  
  });
  const{nombre, contenido} = nota;



  const onInputChange = (e) => {
    setNota({...nota, [e.target.name]: e.target.value})

  }
  const onSubmit = async (e) => {
    e.preventDefault();
    await NotaApi.crearNota(nota);
    
    navegacion('/');
  }

  return (
    <div className="container agregar-nota-container">
    <div className="text-center" style={{ margin: "30px" }}>
      <h1 className="t-stroke-shadow">Agregar Nota</h1>
    </div>

    <form onSubmit={(e) => onSubmit(e)} className="custom-form">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          required={true}
          value={nombre}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contenido" className="form-label">
          Contenido
        </label>
        <input
          type="text"
          className="form-control form-control-lg"
          
          id="contenido"
          name="contenido"
          value={contenido}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-warning btn-sm me-3">
          Agregar Nota
        </button>
        <Link to="/" className="btn btn-danger btn-sm">
          Cancelar
        </Link>
      </div>
    </form>
  </div>

  );
};

export default AgregarNota;