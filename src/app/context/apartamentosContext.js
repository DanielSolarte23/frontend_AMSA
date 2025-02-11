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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getApartamentos = async () => {
    setLoading(true);
    try {
      const res = await getApartamentosRequest();
      setApartamentos(res.data);
    } catch (error) {
      handleError(error, "Error al cargar apartamentos");
    } finally {
      setLoading(false);
    }
  };

  const createApartamentos = async (apartamento) => {
    try {
      const res = await createApartamentoRequest(apartamento);
      setApartamentos((prev) => [...prev, res.data]); // Añadir al estado
    } catch (error) {
      handleError(error, "Error al crear apartamento");
    }
  };

  const deleteApartamento = async (id) => {
    try {
      const res = await deleteApartamentoRequest(id);
      if (res.status === 204) {
        setApartamentos((prev) => prev.filter((apartamento) => apartamento._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar apartamento");
    }
  };

  const getApartamento = async (id) => {
    try {
      const res = await getApartamentoRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener apartamento");
    }
  };

  const updateApartamento = async (id, apartamento) => {
    try {
      await updateApartamentoRequest(id, apartamento);
      setApartamentos((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...apartamento } : item))
      );
    } catch (error) {
      handleError(error, "Error al actualizar apartamento");
    }
  };

  return (
    <ApartamentosContext.Provider
      value={{
        apartamentos,
        createApartamentos,
        getApartamento,
        loading,
        errors,
        deleteApartamento,
        getApartamentos,
        updateApartamento,
      }}
    >
      {children}
    </ApartamentosContext.Provider>
  );
}
