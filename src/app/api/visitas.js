import axios from "./axios";

export const getVisitasRequest = () => axios.get('/visitantes');

export const getVisitaRequest = (id) => axios.get(`/visitantes/${id}`);

export const createVisitaRequest = (visita) => axios.post('/visitantes', visita);

export const updateVisitaRequest = (id, visita) => axios.put(`/visitantes/${id}`, visita);

export const deleteVisitaRequest = (id) => axios.delete(`/visitantes/${id}`)