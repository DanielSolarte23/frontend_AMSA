import axios from "./axios";

export const getApartamentosRequest = () => axios.get('/apartamentos');

export const getApartamentoRequest = (id) => axios.get(`/apartamentos/${id}`);

export const createApartamentoRequest = (apartamento) => axios.post('/apartamentos', apartamento);

export const updateApartamentoRequest = (id, apartamento) => axios.put(`/apartamentos/${id}`, apartamento);

export const deleteApartamentoRequest = (id) => axios.delete(`/apartamentos/${id}`)