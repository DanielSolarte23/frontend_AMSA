import axios from "./axios";

export const getInformesRequest = () => axios.get('/informes');

export const getInformeRequest = (id) => axios.get(`/informes/${id}`);

export const createInformeRequest = (informe) => axios.post('/informes', informe);

export const updateInformeRequest = (id, informe) => axios.put(`/informes/${id}`, informe);

export const deleteInformeRequest = (id) => axios.delete(`/informes/${id}`)