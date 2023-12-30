import axios from 'axios';

const API_URL = 'http://localhost:8080/app/notas'; // Actualiza con la URL de tu backend

const NotaApi = {
  getNota: (id) => axios.get(`${API_URL}/${id}`),
  getNotas: () => axios.get(`${API_URL}/activas`),
  getNotasArchivadas: () => axios.get(`${API_URL}/archivadas` ),
  crearNota: (nota) => axios.post(API_URL, nota),
  editarNota: (id, nota) => axios.put(`${API_URL}/editar/${id}`, nota),
  borrarNota: (id) => axios.delete(`${API_URL}/${id}`),
  archivarNota: (id) => axios.put(`${API_URL}/${id}/archivar`),
  desarchivarNota: (id) => axios.put(`${API_URL}/${id}/desarchivar`),
  obtenerEtiquetasDeNota: (id) => axios.get(`${API_URL}/${id}/etiquetas`),
  agregarEtiquetas: (id, etiquetasIds) => axios.put(`${API_URL}/${id}/addEtiquetas`,   etiquetasIds ),
  fitroPorEtiqueta: (idEtiqueta) => axios.get(`${API_URL}/${idEtiqueta}/filtroPorEtiqueta`),
};

export default NotaApi;