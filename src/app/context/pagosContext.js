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

  const getPagos = async () => {
    try {
      const res = await getPagosRequest();
      setPagos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPagos = async (pago) => { 
    try {
      const res = await createPagoRequest(pago);
      console.log(res);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      console.log(error);
    }
  };
  


  const deletePagos = async (id) => {
    try {
      const res = await deletePagoRequest(id);
      if (res.status === 204) setPagos(pagos.filter((pago) => pago._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getPago = async (id) => {
    try {
      const res = await getPagoRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePago = async (id, pago) => {
    try {
      await updatePagoRequest(id, pago);
    } catch (error) {
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
      }}
    >
      {children}
    </PagosContext.Provider>
  );
}