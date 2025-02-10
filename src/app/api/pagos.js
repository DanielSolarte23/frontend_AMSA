import axios from "./axios";

export const getPagosRequest = () => axios.get('/pagos');

export const getPagoRequest = (id) => axios.get(`/pagos/${id}`);

export const createPagoRequest = (pago) => axios.post('/pagos', pago);

export const updatePagoRequest = (id, pago) => axios.put(`/pagos/${id}`, pago);

export const deletePagoRequest = (id) => axios.delete(`/pagos/${id}`)