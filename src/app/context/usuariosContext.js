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

  const getUsuarios = async () => {
    try {
      const res = await getUsuariosRequest();
      setUsuarios(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUsuario = async (usuario) => { 
    try {
      const res = await createUsuarioRequest(usuario);
      console.log(res);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      console.log(error);
    }
  };
  


  const deleteUsuarios = async (id) => {
    try {
      const res = await deleteUsuarioRequest(id);
      if (res.status === 204) setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getUsuario = async (id) => {
    try {
      const res = await getUsuarioRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUsuario = async (id, usuario) => {
    try {
      await updateUsuarioRequest(id, usuario);
    } catch (error) {
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
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
}