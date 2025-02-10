import axios from "./axios";

export const getVisitasRequest = () => axios.get('/visitas');

export const getVisitaRequest = (id) => axios.get(`/visitas/${id}`);

export const createVisitaRequest = (visita) => axios.post('/visitas', visita);

export const updateVisitaRequest = (id, visita) => axios.put(`/visitas/${id}`, visita);

export const deleteVisitaRequest = (id) => axios.delete(`/visitas/${id}`)