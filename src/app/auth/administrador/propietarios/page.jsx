'use client'

import { useEffect, useState } from "react";
import { useUsuarios } from "@/app/context/usuariosContext";

function Propietarios() {
    const {
        propietarios,
        getPropietarios,
        createUsuario,
        deleteUsuarios,
        updateUsuario,
        loading,
        errors
    } = useUsuarios();

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        documento: "",
        correo: "",
        contraseña: "",
        rol: "propietario",
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        getPropietarios();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await updateUsuario(editId, form);
            setEditId(null);
        } else {
            await createUsuario(form);
            console.log(errors);
        }

        await getPropietarios();

        setForm({
            nombre: "",
            apellido: "",
            documento: "",
            correo: "",
            contraseña: "",
            rol: "propietario",
        });
    };

    const handleDelete = async (id) => {
        await deleteUsuarios(id);
        await getPropietarios();
    };


    const handleEdit = (propietario) => {
        setForm({
            nombre: propietario.nombre,
            apellido: propietario.apellido,
            documento: propietario.documento,
            correo: propietario.correo,
            contraseña: propietario.contraseña,
            rol: propietario.rol,
        });
        setEditId(propietario.id);
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <div className="h-5"></div>
            <div className="h-screen flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">
                    {editId ? "Editar Propietario" : "Registrar Propietario"}
                </h2>
                <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
                        required
                    />
                    <input
                        type="text"
                        name="apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        placeholder="Apellido"
                        className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
                        required
                    />
                    <input
                        type="text"
                        name="documento"
                        value={form.documento}
                        onChange={handleChange}
                        placeholder="Documento de identidad"
                        className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
                        required
                    />
                    <input
                        type="text"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        placeholder="Correo"
                        className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
                        required
                    />
                    <input
                        type="password"
                        name="contraseña"
                        value={form.contraseña}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white px-2 py-4 rounded">
                        {editId ? "Actualizar" : "Registrar"}
                    </button>
                </form>
            </div>

            <hr />

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
                            <th className="border border-gray-700 p-2">Acciones</th>
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
                                <td className="border border-gray-700 p-2 flex gap-2 justify-center">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleEdit(propi)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(propi.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Propietarios