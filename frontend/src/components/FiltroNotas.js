import React, { useState, useEffect } from 'react';
import NotaApi from '../api/NotaApi';
import EtiquetaApi from '../api/EtiquetaApi';


const FiltroNotas = () => {
  const [etiquetas, setEtiquetas] = useState([]);
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(null);
  const [notasFiltradas, setNotasFiltradas] = useState([]);

  useEffect(() => {
    cargarEtiquetas();
  }, []);

  const cargarEtiquetas = async () => {
    try {
      const response = await EtiquetaApi.getEtiquetas();
      setEtiquetas(response.data);
      console.log('Cargando etiquetas: ', response.data);
    } catch (error) {
      console.error('Error al cargar las etiquetas', error);
    }
  };

  const filtrarNotasPorEtiqueta = async () => {
    console.log('Filtrando notas por etiqueta...');
    console.log('Etiqueta seleccionada:', etiquetaSeleccionada);
  
    if (etiquetaSeleccionada) {
      try {
        const response = await NotaApi.fitroPorEtiqueta(etiquetaSeleccionada.id);
        console.log('Notas filtradas:', response.data);
        setNotasFiltradas(response.data);
      } catch (error) {
        console.error('Error al filtrar las notas por etiqueta', error);
      }
    }
  };

  const manejarEtiquetaChange = (event) => {
    const idEtiqueta = event.target.value;
    console.log('Etiqueta: ', idEtiqueta);
  
    if (idEtiqueta !== "") {
      const etiquetaSeleccionada = etiquetas.find((etiqueta) => etiqueta.id === Number(idEtiqueta));
      if (etiquetaSeleccionada) {
        setEtiquetaSeleccionada(etiquetaSeleccionada);
      } else {
        console.error('Etiqueta no encontrada');
      }
    } else {
      setEtiquetaSeleccionada(null);
      console.log('Etiqueta es una cadena vacía: ', idEtiqueta);
    }
  };

  return (
    <div className="container listado-notas-container filtro-container">
      <h2 className="t-stroke-shadow">Filtrar Notas</h2>
      <label htmlFor="selectEtiqueta">Selecciona una etiqueta:</label>
      <select id="selectEtiqueta" onChange={manejarEtiquetaChange}>
        <option className="container listado-notas-container" value="">-- Seleccione una etiqueta --</option>
        {etiquetas.map((etiqueta) => (
          <option key={etiqueta.id} value={etiqueta.id}>
            {etiqueta.nombre}
          </option>
        ))}
      </select>
      <button 
        className="btn-filtro"
        onClick={() => { console.log('Botón clicado'); filtrarNotasPorEtiqueta(); }}>
          
          Filtrar
        </button>
      {notasFiltradas.length > 0 && (
        <div>
        <h3 className="t-stroke-shadow">Notas Filtradas</h3>
        <div className="row">
                {notasFiltradas.map((nota, indice) => (
                    <div key={indice} className="col-md-4 mb-3">
                        <div className={`card text-primary`} style={{ maxWidth: "18rem" }}>
                            <div className="card-title">
                                <h4 className = "card-title-name">{nota.nombre}</h4>
                                
                            </div>
                            <div className="card-body">
                                <p className="card-text">{nota.contenido}</p>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
      </div>
      )}
    </div>
  );
};

export default FiltroNotas;