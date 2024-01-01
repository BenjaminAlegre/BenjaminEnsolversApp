import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/NavegacionStyle.css'
export default function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand t-stroke-shadow " to="/">Notas Ensolvers</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="agregar">Agregar Nota</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="archivadas">Notas Archivadas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="filtro">Filtrar</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


