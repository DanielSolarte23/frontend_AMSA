'use client'
import { useState, useContext, createContext } from "react";

import {
    createVisitaRequest,
    getVisitaRequest,
    getVisitasRequest,
    deleteVisitaRequest,
    updateVisitaRequest,
} from "../api/visitas";

const VisitasContext = createContext();

export const useVisitas = () => {
  const context = useContext(VisitasContext);

  if (!context) {
    throw new Error("El useVisitas debe estar dentro de un VisitasProvider");
  }

  return context;
};

export function VisitasProvider({ children }) {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getVisitas = async () => {
    setLoading(true);
    try {
      const res = await getVisitasRequest();
      setVisitas(res.data);
    } catch (error) {
      handleError(error, "Error al cargar visitas");
      console.log(error);
    }
  };

  const createVisitas = async (visita) => { 
    try {
      const res = await createVisitaRequest(visita);
      setVisitas((prev) => [...prev, res.data]);
      console.log(res);
    } catch (error) {
      handleError(error, "Error al crear visita");
      console.error('Error:', error.response ? error.response.data : error.message);
      console.log(error);
    }
  };
  


  const deleteVisitas = async (id) => {
    try {
      const res = await deleteVisitaRequest(id);
      if (res.status === 204) {
        setVisitas((prev) => prev.filter((visita) => visita._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar visita");
      console.log(error);
    }
  };

  const getVisita = async (id) => {
    try {
      const res = await getVisitaRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener visita");
      console.log(error);
    }
  };

  const updateVisita = async (id, visita) => {
    try {
      await updateVisitaRequest(id, visita);
      setVisitas((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...visita } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar visita");
      console.log(error);
    }
  };

  return (
    <VisitasContext.Provider
      value={{
        visitas,
        createVisitas,
        getVisita,
        deleteVisitas,
        getVisitas,
        updateVisita,
        loading,
        errors
      }}
    >
      {children}
    </VisitasContext.Provider>
  );
}