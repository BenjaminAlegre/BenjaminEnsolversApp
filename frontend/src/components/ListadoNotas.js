import React, { useEffect, useState } from 'react'
import NotaApi from '../api/NotaApi';
import { Link } from 'react-router-dom';
import '../styles/ListadoNotas.css';

export default function ListadoNotas() {

    const [notas, setNotas] = useState([]);

    useEffect(() => {
        cargarNotas();
      }, []);
    
    
    const cargarNotas = async () => {
        try {
          const response = await NotaApi.getNotas();
          setNotas(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error al cargar las notas', error);
        }
    };

    const archivarNota = async (id) => {
        try {
            await NotaApi.archivarNota(id);
            cargarNotas();
        } catch (error) {
            console.error('Error al archivar la nota', error);
        }
    };


    const confirmarEliminarNota = async (id, nombre) => {
        const confirmacion = window.confirm(`¿Estás seguro que deseas eliminar la nota "${nombre}"? Esta acción no se puede revertir.`);
        if (confirmacion) {
            try {
                await NotaApi.borrarNota(id);
                cargarNotas();
            } catch (error) {
                console.error('Error al eliminar la nota', error);
            }
        }
    };

    return (
        <div className="container listado-notas-container">
      <div className="text-center-up listado-notas-title" style={{ margin: '15px', textAlign: 'center' }}>
        <h2 className="t-stroke-shadow">Bloc de Notas</h2>
      </div>
      <div className="card-container">
        {notas.map((nota, indice) => (
          <div key={indice} className="card text-primary" style={{ maxWidth: '18rem' }}>
            <div className="card-title">
              <h4 className = "card-title-name">{nota.nombre}</h4>
              <div className="dropdown">
                <button
                  className="btn btn-ouline-warning dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to={`/editar/${nota.id}`}
                      className="dropdown-item btn btn-warning btn-sm me-3"
                    >
                      Editar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/etiquetas/${nota.id}`}
                      className="dropdown-item btn btn-info btn-sm"
                    >
                      Administrar Etiquetas
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => archivarNota(nota.id)}
                      className="dropdown-item btn btn-secondary btn-sm"
                    >
                      Archivar
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => confirmarEliminarNota(nota.id, nota.nombre)}
                      className="dropdown-item btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="card-body ">
              <p className="card-text ">{nota.contenido}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}
