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

  const getVisitas = async () => {
    try {
      const res = await getVisitasRequest();
      setVisitas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createVisitas = async (visita) => { 
    try {
      const res = await createVisitaRequest(visita);
      console.log(res);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      console.log(error);
    }
  };
  


  const deleteVisitas = async (id) => {
    try {
      const res = await deleteVisitaRequest(id);
      if (res.status === 204) setVisitas(visitas.filter((visita) => visita._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getVisita = async (id) => {
    try {
      const res = await getVisitaRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateVisita = async (id, visita) => {
    try {
      await updateVisitaRequest(id, visita);
    } catch (error) {
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
      }}
    >
      {children}
    </VisitasContext.Provider>
  );
}