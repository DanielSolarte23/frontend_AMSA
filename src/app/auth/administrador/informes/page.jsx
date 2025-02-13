'use client'

import { useEffect, useState } from "react";
import { useInformes } from "@/app/context/informesContext";
import { useUsuarios } from "@/app/context/usuariosContext";

function InformesAdmin() {
  const {
    informes,
    getInformes,
    createInforme,
    deleteInforme,
    updateInforme,
    loading,
    errors
  } = useInformes();

  const {
    usuarios,
    getUsuarios,
  } = useUsuarios();

  const [form, setForm] = useState({
    asunto: "",
    descripcion: "",
    usuarioId: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getInformes();
    getUsuarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateInforme(editId, form);
      setEditId(null);
    } else {
      await createInforme(form);
      console.log(errors);
    }

    await getInformes();

    setForm({ asunto: "", descripcion: "", usuarioId: "" });
  };

  const handleDelete = async (id) => {
    await deleteInforme(id);
    await getInformes();
  };


  const handleEdit = (informe) => {
    setForm({
      asunto: informe.asunto,
      descripcion: informe.descripcion,
      usuarioId: informe.usuarioId,
    });
    setEditId(informe.id);
  };

  return (
    <div className="p-4  mx-auto">
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">
          {editId ? "Editar Informe" : "Registrar Informe"}
        </h2>
        <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <input
            type="text"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            placeholder="Asunto"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          />
          <select
            name="usuarioId"
            value={form.usuarioId}
            onChange={handleChange}
            className="w-full px-2 py-4 border rounded border-gray-600 bg-gray-100 dark:bg-gray-800"
            required
          >
            <option value="">Seleccionar Remitente</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre}
              </option>
            ))}
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white px-2 py-4 rounded">
            {editId ? "Actualizar" : "Registrar"}
          </button>
        </form>
      </div>

      <hr />

      <div className="py-10 flex flex-col justify-start items-center">
        <h2 className="text-2xl font-bold mb-4">Lista de Informes</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-700 p-2">ID</th>
              <th className="border border-gray-700 p-2">Asunto</th>
              <th className="border border-gray-700 p-2">Descripción</th>
              <th className="border border-gray-700 p-2">Remitente</th>
              <th className="border border-gray-700 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {informes.map((informe) => (
              <tr key={informe.id} className="border border-gray-700 text-center">
                <td className="border border-gray-700 p-2">{informe.id}</td>
                <td className="border border-gray-700 p-2">{informe.asunto}</td>
                <td className="border border-gray-700 p-2">{informe.descripcion}</td>
                <td className="border border-gray-700 p-2">{informe.Usuario?.nombre || "sin remitente"}</td>
                <td className="border border-gray-700 p-2 flex gap-2 justify-center">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(informe)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(informe.id)}
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

export default InformesAdmin