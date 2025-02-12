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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getInformes = async () => {
    setLoading(true);
    try {
      const res = await getInformesRequest();
      setInformes(res.data);
    } catch (error) {
      handleError(error, "Error al cargar informes");
      console.log(error);
    } finally{
      setLoading(false);
    }
  };

  const createInforme = async (informe) => { 
    try {
      const res = await createInformeRequest(informe);
      setInformes((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      handleError(error, "Error al crear informe");
    }
  };
  


  const deleteInforme = async (id) => {
    try {
      const res = await deleteInformeRequest(id);
      if (res.status === 204) {
        setInformes((prev) => prev.filter((informe) => informe._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar informe");
      console.log(error);
    }
  };

  const getInforme = async (id) => {
    try {
      const res = await getInformeRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener informe");
    }
  };

  const updateInforme = async (id, informe) => {
    try {
      await updateInformeRequest(id, informe);
      setInformes((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...informe } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar informe");
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
        loading,
        errors,
      }}
    >
      {children}
    </InformesContext.Provider>
  );
}