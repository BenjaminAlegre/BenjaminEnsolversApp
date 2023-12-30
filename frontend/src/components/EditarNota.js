import React, { useEffect, useState } from 'react';
import NotaApi from '../api/NotaApi';
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function EditarNota() {

    let navegacion = useNavigate();

    const {id} =useParams();

    const [nota, setNota] = useState({
        nombre: '',
        contenido: ''
  
    });
    const{nombre, contenido} = nota;

    useEffect(() => {
        cargarNota();
    }, []);

    const cargarNota = async () => {
        const response = await NotaApi.getNota(id);
        setNota(response.data);
    }

    const onInputChange = (e) => {
        setNota({...nota, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await NotaApi.editarNota(id,nota);
        navegacion('/');
    }

    

    return (
        <div className='container agregar-nota-container'>
            <div className='text-center' style={{margin: "30px"}}>
            <h1 className="t-stroke-shadow">Editar Nota</h1>
            </div>
        
        <form onSubmit={(e) => onSubmit(e)} className="custom-form">
        <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre </label>
            <input type="text" className="form-control" id="nombre" name='nombre' required={true}
            value={nombre} onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="contenido" className="form-label">Contenido</label>
            <input type="text" className="form-control" id="contenido" name='contenido'
            value={contenido} onChange={(e) => onInputChange(e)}/>
        </div>
        <div className="text-center">
            <button type="submit" className="btn btn-warning btn-sm me-3">Guardar</button>
            <Link to="/" className="btn btn-danger btn-sm">Cancelar</Link>
        </div>
        </form>
        </div>

    
    );
};


