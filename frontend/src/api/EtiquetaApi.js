import axios from 'axios';

const API_URL = 'http://localhost:8080/app/etiquetas'; // Actualiza con la URL de tu backend

const EtiquetaApi = {
  getEtiquetas: () => axios.get(API_URL),
  crearEtiqueta: (etiqueta) => axios.post(API_URL, etiqueta),
  editarEtiqueta: (id, etiqueta) => axios.put(`${API_URL}/${id}`, etiqueta),
  obtenerEtiquetasDeNota: (id) => axios.get(`${API_URL}/${id}`),
};

export default EtiquetaApi;
