
import React from 'react';
import Navegacion from './plantilla/Navegacion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AgregarNota from './components/AgregarNota';
import EditarNota from './components/EditarNota';
import ListadoNotas from './components/ListadoNotas';
import ListadoNotasArchivadas from './components/ListadoNotasArchivadas';
import AdministrarEtiquetas from './components/AdministrarEtiquetas';
import AsociarEtiquetas from './components/AsociarEtiquetas';
import FiltroNotas from './components/FiltroNotas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navegacion />
        <Routes>
          <Route exact path='/' element={<ListadoNotas/>}/> 
          <Route exact path='/agregar' element={<AgregarNota/>}/>
          <Route exact path='/editar/:id' element={<EditarNota/>}/>
          <Route exact path='/archivadas' element={<ListadoNotasArchivadas/>}/>
          <Route exact path='/etiquetas/:id' element={<AdministrarEtiquetas/>}/>
          <Route exact path='/asociarEtiquetas/:id' element={<AsociarEtiquetas/>}/>
          <Route exact path='/filtro' element={<FiltroNotas/>}/>
        </Routes>
      </BrowserRouter>
      
  
  
    </div>
  );
}

export default App;
