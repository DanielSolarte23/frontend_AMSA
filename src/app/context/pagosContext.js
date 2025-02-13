'use client'
import { useState, useContext, createContext } from "react";

import {
    createPagoRequest,
    getPagoRequest,
    getPagosRequest,
    deletePagoRequest,
    updatePagoRequest,
} from "../api/pagos";

const PagosContext = createContext();

export const usePagos = () => {
  const context = useContext(PagosContext);

  if (!context) {
    throw new Error("El usePagos debe estar dentro de un PagosProvider");
  }

  return context;
};

export function PagosProvider({ children }) {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getPagos = async () => {
    setLoading(true);
    try {
      const res = await getPagosRequest();
      setPagos(res.data);
    } catch (error) {
      handleError(error, "Error al cargar los aparatamentos")
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createPagos = async (pago) => { 
    try {
      const res = await createPagoRequest(pago);
      setPagos((prev) => [...prev, res.data]);
    } catch (error) {
      handleError(error, "Error al cargar el pago")
      console.log(error);
    }
  };
  


  const deletePagos = async (id) => {
    try {
      const res = await deletePagoRequest(id);
      if (res.status === 204) {
        setPagos((prev) => prev.filter((pago) => pago._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar el pago")
      console.log(error);
    }
  };

  const getPago = async (id) => {
    try {
      const res = await getPagoRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener el pago")
      console.log(error);
    }
  };

  const updatePago = async (id, pago) => {
    try {
      await updatePagoRequest(id, pago);
      setPagos((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...pago } : item))
      );      
    } catch (error) {
      handleError(error, "Error al actualizar el pago")
      console.log(error);
    }
  };

  return (
    <PagosContext.Provider
      value={{
        pagos,
        createPagos,
        getPago,
        deletePagos,
        getPagos,
        updatePago,
        loading,
        errors
      }}
    >
      {children}
    </PagosContext.Provider>
  );
}