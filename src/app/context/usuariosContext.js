'use client'
import { useState, useContext, createContext } from "react";

import {
  createUsuarioRequest,
  getUsuarioRequest,
  getUsuariosRequest,
  deleteUsuarioRequest,
  updateUsuarioRequest,
} from "../api/usuarios";

const UsuariosContext = createContext();

export const useUsuarios = () => {
  const context = useContext(UsuariosContext);

  if (!context) {
    throw new Error("El useUsuarios debe estar dentro de un UsuariosProvider");
  }

  return context;
};

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleError = (error, defaultMessage) => {
    setErrors(error.response?.data?.message || defaultMessage);
    console.log(error);
  };

  const getUsuarios = async () => {
    setLoading(true);
    try {
      const res = await getUsuariosRequest();
      setUsuarios(res.data);
    } catch (error) {
      handleError(error, "Error al cargaar usuarios")
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const createUsuario = async (usuario) => {
    try {
      const res = await createUsuarioRequest(usuario);
      setUsuarios((prev) => [...prev, res.data]);
      console.log(res);
    } catch (error) {
      handleError(error, "Error al crear usuario");
    }
  };



  const deleteUsuarios = async (id) => {
    try {
      const res = await deleteUsuarioRequest(id);
      if (res.status === 204) {
        setUsuarios((prev) => prev.filter((usuario) => usuario._id !== id));
      }
    } catch (error) {
      handleError(error, "Error al eliminar usuario")
      console.log(error);
    }
  };

  const getUsuario = async (id) => {
    try {
      const res = await getUsuarioRequest(id);
      return res.data;
    } catch (error) {
      handleError(error, "Error al obtener usuario");
      console.log(error);
    }
  };

  const updateUsuario = async (id, usuario) => {
    try {
      await updateUsuarioRequest(id, usuario);
      setUsuarios((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...usuario } : item))
    );
    } catch (error) {
      handleError(error, "Error al actualizar usuario");
      console.log(error);
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        createUsuario,
        getUsuario,
        deleteUsuarios,
        getUsuarios,
        updateUsuario,
        loading,
        errors,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
}