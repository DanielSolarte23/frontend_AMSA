'use client'
import { useEffect, useState } from "react";
import { useApartamentos } from "@/app/context/apartamentosContext";
import { useUsuarios } from "@/app/context/usuariosContext";

export default function ApartamentosComponent() {
  const {
    apartamentos,
    getApartamentos,
  } = useApartamentos();

  useEffect(() => {
    getApartamentos();

  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="h-20"></div>

      <div className="py-10 flex flex-col justify-start items-center">
        <h2 className="text-2xl font-bold mb-4">Lista de Apartamentos</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-700 p-2">ID</th>
              <th className="border border-gray-700 p-2">Nro Apto</th>
              <th className="border border-gray-700 p-2">Torre</th>
              <th className="border border-gray-700 p-2">Estado</th>
              <th className="border border-gray-700 p-2">Propietario</th>
            </tr>
          </thead>
          <tbody>
            {apartamentos.map((apt) => (
              <tr key={apt.id} className="border border-gray-700 text-center">
                <td className="border border-gray-700 p-2">{apt.id}</td>
                <td className="border border-gray-700 p-2">{apt.nroApto}</td>
                <td className="border border-gray-700 p-2">{apt.torre}</td>
                <td className="border border-gray-700 p-2">{apt.estado}</td>
                <td className="border border-gray-700 p-2">{apt.Usuario?.nombre || "sin propietario"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
