'use client'
import { useState, useContext, createContext } from "react";

import {
  createInformeRequest,
  getInformeRequest,
  getInformesRequest,
  deleteInformeRequest,
  updateInformeRequest,
} from "../api/informes";

const InformesContext = createContext();

export const useInformes = () => {
  const context = useContext(InformesContext);

  if (!context) {
    throw new Error("El useInformes debe estar dentro de un InformesProvider");
  }

  return context;
};

export function InformesProvider({ children }) {
  const [informes, setInformes] = useState([]);

  const getInformes = async () => {
    try {
      const res = await getInformesRequest();
      setInformes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createInforme = async (informe) => { 
    try {
      const res = await createInformeRequest(informe);
      console.log(res);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      console.log(error);
    }
  };
  


  const deleteInforme = async (id) => {
    try {
      const res = await deleteInformeRequest(id);
      if (res.status === 204) setInformes(informes.filter((informe) => informe._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getInforme = async (id) => {
    try {
      const res = await getInformeRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateInforme = async (id, informe) => {
    try {
      await updateInformeRequest(id, informe);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InformesContext.Provider
      value={{
        informes,
        createInforme,
        getInforme,
        deleteInforme,
        getInformes,
        updateInforme,
      }}
    >
      {children}
    </InformesContext.Provider>
  );
}