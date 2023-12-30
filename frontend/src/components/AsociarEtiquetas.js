import React, { useState, useEffect } from 'react';
import NotaApi from '../api/NotaApi';
import EtiquetaApi from '../api/EtiquetaApi';
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function AsociarEtiquetas() {
  const [etiquetas, setEtiquetas] = useState([]);
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);

  const {id} =useParams();
  let navegacion = useNavigate();


  useEffect(() => {
    cargarEtiquetas();
    cargarEtiquetasAsociadas();
  }, []);

  const cargarEtiquetas = async () => {
    try {
      const response = await EtiquetaApi.getEtiquetas();
      setEtiquetas(response.data);
    } catch (error) {
      console.error('Error al cargar las etiquetas', error);
    }
  };

  const cargarEtiquetasAsociadas = async () => {
    try {
        const response = await NotaApi.obtenerEtiquetasDeNota(id);
      
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setEtiquetasSeleccionadas(response.data.map(etiqueta => etiqueta.id));
      } else {
        console.error('La respuesta no contiene un array de etiquetas', response);
      }
    } catch (error) {
      console.error('Error al cargar las etiquetas asociadas', error);
    }
  };

  const manejarCheckboxChange = (id) => {

    setEtiquetasSeleccionadas((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((etiquetaId) => etiquetaId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const asociarEtiquetas = async () => {
    try {
      if (etiquetasSeleccionadas.length > 0) {
        await NotaApi.agregarEtiquetas(id, etiquetasSeleccionadas);
        console.log('Etiquetas asociadas con éxito');
        navegacion(`/etiquetas/${id}`);
      } else {
        console.error('No hay etiquetas seleccionadas para asociar');
      }
    } catch (error) {
      console.error('Error al asociar las etiquetas', error);
    }
  };

  return (
    <div className="container listado-notas-container">
      <ul className="list-group list-group-horizontal">
        {etiquetas.map((etiqueta) => (
          <li key={etiqueta.id} className="list-group-item col-md-3 d-flex ">
            <input
              className="form-check-input me-1"
              type="checkbox"
              value={etiqueta.id}
              id={`checkbox-${etiqueta.id}`}
              checked={etiquetasSeleccionadas.includes(etiqueta.id)}
              onChange={() => manejarCheckboxChange(etiqueta.id)}
            />
            <label className="form-check-label" htmlFor={`checkbox-${etiqueta.id}`}>
              {etiqueta.nombre}
            </label>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-3" onClick={asociarEtiquetas}>
        Asociar Etiquetas
      </button>
      <Link to={`/etiquetas/${id}`} className="btn btn-danger mt-3">Cancelar</Link>
    </div>
  );
}