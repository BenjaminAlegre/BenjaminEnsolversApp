import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotaApi from '../api/NotaApi';
import EtiquetaApi from '../api/EtiquetaApi';
import "../styles/Etiquetas.css";

export default function AdministrarEtiquetas() {
    const [etiquetas, setEtiquetas] = useState([]);
    const [etiquetasDisponibles, setEtiquetasDisponibles] = useState([]);
    // const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);

    const {id} =useParams();
   

    useEffect(() => {
      cargarEtiquetas();
      cargarEtiquetasDisponibles();
    }, []);
  
    const cargarEtiquetas = async () => {
        try {
          const response = await NotaApi.obtenerEtiquetasDeNota(id);
          setEtiquetas(response.data);
          console.log("LLego la info a admin etiquetas");
          console.log(response.data);
        } catch (error) {
          console.error('Error al cargar las etiquetas', error);
        }
      };
    
      const cargarEtiquetasDisponibles = async () => {
        try {
            const response = await EtiquetaApi.getEtiquetas();
            setEtiquetasDisponibles(response.data);
            console.log("LLego la info a admin etiquetas", etiquetasDisponibles);
        } catch (error) {
            console.error('Error al cargar las etiquetas disponibles', error);
        }
    };

  //   const handleEtiquetasChange = (event) => {
  //     const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
  //     setEtiquetasSeleccionadas(selectedOptions);
  // };
  
  // const agregarEtiquetasANota = async () => {
  //     try {
  //         await NotaApi.agregarEtiquetas(id, etiquetasSeleccionadas);
  //         cargarEtiquetas(); // Vuelve a cargar las etiquetas asociadas después de agregar nuevas
  //         cargarEtiquetasDisponibles(); // Vuelve a cargar las etiquetas disponibles después de agregar nuevas
  //     } catch (error) {
  //         console.error('Error al agregar etiquetas a la nota', error);
  //     }
  // };


    return (
      <div className="container listado-notas-container">
        <div className="text-up listado-notas-title" style={{ margin: "30px" }}>
          <h2 className="t-stroke-shadow">Etiquetas Asociadas</h2>
        </div>
        <div className="card-container">
        <ul className="list-group list-group-horizontal">
          {etiquetas.map((etiqueta, index) => (
            <li key={index} className="list-group-item  mb-3">
              
                  <h4>{etiqueta.nombre}</h4>
        
            </li>
          ))}
         </ul> 
        </div>

        <Link to={`/asociarEtiquetas/${id}`} className="btn btn-info btn-sm">Agregar Etiquetas</Link>
        <Link to={`/`} className="btn btn-danger btn-sm">Cancelar</Link>
      </div>
    );

   
};
