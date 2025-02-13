'use client'

import { useEffect, useState } from "react";
import { useUsuarios } from "@/app/context/usuariosContext";

function Propietarios() {
    const {
        propietarios,
        getPropietarios,
        loading,
        errors
    } = useUsuarios();

    useEffect(() => {
        getPropietarios();
    }
        , []);

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <div className="h-20"></div>
            <div className="py-10 flex flex-col justify-start items-center">
                <h2 className="text-2xl font-bold mb-4">Lista de propietarios</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border border-gray-700 p-2">ID</th>
                            <th className="border border-gray-700 p-2">Nombre</th>
                            <th className="border border-gray-700 p-2">Apellido</th>
                            <th className="border border-gray-700 p-2">documento</th>
                            <th className="border border-gray-700 p-2">correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propietarios.map((propi) => (
                            <tr key={propi.id} className="border border-gray-700 text-center">
                                <td className="border border-gray-700 p-2">{propi.id}</td>
                                <td className="border border-gray-700 p-2">{propi.nombre}</td>
                                <td className="border border-gray-700 p-2">{propi.apellido}</td>
                                <td className="border border-gray-700 p-2">{propi.documento}</td>
                                <td className="border border-gray-700 p-2">{propi.correo}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Propietarios