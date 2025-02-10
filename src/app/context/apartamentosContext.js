'use client'
import { useState, useContext, createContext } from "react";

import {
  createApartamentoRequest,
  getApartamentoRequest,
  getApartamentosRequest,
  deleteApartamentoRequest,
  updateApartamentoRequest,
} from "../api/apartamentos";

const ApartamentosContext = createContext();

export const useApartamentos = () => {
  const context = useContext(ApartamentosContext);

  if (!context) {
    throw new Error("El useApartamentos debe estar dentro de ApartamentosProvider");
  }

  return context;
};

export function ApartamentosProvider({ children }) {
  const [apartamentos, setApartamentos] = useState([]);

  const getApartamentos = async () => {
    try {
      const res = await getApartamentosRequest();
      setApartamentos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createApartamentos = async (apartamento) => { 
    try {
      const res = await createApartamentoRequest(apartamento);
      console.log(res);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      console.log(error);
    }
  };
  


  const deleteApartamento = async (id) => {
    try {
      const res = await deleteApartamentoRequest(id);
      if (res.status === 204) setApartamentos(apartamentos.filter((apartamento) => apartamento._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getApartamento = async (id) => {
    try {
      const res = await getApartamentoRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateApartamento = async (id, apartamento) => {
    try {
      await updateApartamentoRequest(id, apartamento);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ApartamentosContext.Provider
      value={{
        apartamentos,
        createApartamentos,
        getApartamento,
        deleteApartamento,
        getApartamentos,
        updateApartamento,
      }}
    >
      {children}
    </ApartamentosContext.Provider>
  );
}